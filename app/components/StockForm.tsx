'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StockOption {
  product_name: string;
  option: string | null;
}

const StockForm = () => {
  const [options, setOptions] = useState<StockOption[]>([]);
  const [selectedKey, setSelectedKey] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [changeType, setChangeType] = useState('입고');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  // 옵션 목록 불러오기
  useEffect(() => {
    const fetchOptions = async () => {
      const { data, error } = await supabase.from('stocks').select('product_name, option');
      if (error) {
        console.error('옵션 불러오기 실패:', error);
        return;
      }

      // 중복 제거
      const unique = new Map<string, StockOption>();
      data?.forEach((item) => {
        const key = `${item.product_name}__${item.option || ''}`;
        if (!unique.has(key)) {
          unique.set(key, { product_name: item.product_name, option: item.option });
        }
      });

      setOptions(Array.from(unique.values()));
    };

    fetchOptions();
  }, []);

  const handleAdjust = async () => {
    if (!selectedKey || quantity === 0) {
      setMessage('항목을 선택하고 수량을 입력하세요.');
      return;
    }

    const [product_name, optionRaw] = selectedKey.split('__');
    const option = optionRaw || null;
    const isSubtract = ['출고', '불량', '사은품'].includes(changeType);
    const adjustedQty = isSubtract ? -Math.abs(quantity) : Math.abs(quantity);

    // stocks에서 기존 항목 찾기
    const { data: existing, error: fetchError } = await supabase
      .from('stocks')
      .select('*')
      .eq('product_name', product_name)
      .eq('option', option);

    if (fetchError || !existing || existing.length === 0) {
      setMessage('해당 재고 항목이 존재하지 않습니다.');
      return;
    }

    const newQty = existing[0].quantity + adjustedQty;
    if (newQty < 0) {
      setMessage('재고 수량이 음수가 될 수 없습니다.');
      return;
    }

    // stocks 수량 업데이트
    const { error: updateError } = await supabase
      .from('stocks')
      .update({ quantity: newQty, updated_at: new Date() })
      .eq('id', existing[0].id);

    if (updateError) {
      setMessage('재고 수량 업데이트 실패');
      return;
    }

    // 이력 저장
    await supabase.from('stock_history').insert([
      {
        product_name,
        option,
        quantity: adjustedQty,
        change_type: changeType,
        note,
      },
    ]);

    setMessage('✅ 재고가 성공적으로 수정되었습니다.');
    setSelectedKey('');
    setQuantity(0);
    setChangeType('입고');
    setNote('');
  };

  return (
    <div className="p-4 mt-8 border rounded shadow max-w-md bg-white">
      <h2 className="text-xl font-bold mb-4">🔄 재고 수동 조정</h2>

      {/* 상품+옵션 드롭다운 */}
      <select
        className="border p-2 mb-2 w-full"
        value={selectedKey}
        onChange={(e) => setSelectedKey(e.target.value)}
      >
        <option value="">상품명 + 옵션 선택</option>
        {options.map((opt, idx) => (
          <option key={idx} value={`${opt.product_name}__${opt.option || ''}`}>
            {opt.product_name} ({opt.option || '-'})
          </option>
        ))}
      </select>

      {/* 수량 입력 */}
      <input
        type="number"
        className="border p-2 mb-2 w-full"
        placeholder="수량"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      {/* 조정유형 선택 */}
      <select
        className="border p-2 mb-2 w-full"
        value={changeType}
        onChange={(e) => setChangeType(e.target.value)}
      >
        <option value="입고(추가)">입고(추가)</option>
        <option value="출고(차감)">출고(차감)</option>
        <option value="폐기(차감)">폐기(차감)</option>
        <option value="기타">기타</option>
      </select>

      {/* 비고 입력 */}
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        placeholder="비고 (선택사항)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleAdjust}
      >
        재고 조정하기
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default StockForm;