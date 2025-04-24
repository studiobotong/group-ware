'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const StockRegisterForm = () => {
  const [productName, setProductName] = useState('');
  const [option, setOption] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!productName || quantity <= 0) {
      setMessage('상품명과 수량을 올바르게 입력해주세요.');
      return;
    }

    // 현재 상품+옵션 존재 여부 확인
    const { data: existing, error: fetchError } = await supabase
      .from('stocks')
      .select('*')
      .eq('product_name', productName)
      .eq('option', option);

    if (fetchError) {
      setMessage('재고 확인 중 오류 발생');
      return;
    }

    if (existing.length > 0) {
      // 기존 재고가 있다면 → 수량 업데이트
      const updatedQuantity = existing[0].quantity + quantity;

      const { error: updateError } = await supabase
        .from('stocks')
        .update({ quantity: updatedQuantity, updated_at: new Date() })
        .eq('id', existing[0].id);

      if (updateError) {
        setMessage('재고 업데이트 실패');
        return;
      }
    } else {
      // 새 재고 등록
      const { error: insertError } = await supabase.from('stocks').insert([
        {
          product_name: productName,
          option,
          quantity,
        },
      ]);

      if (insertError) {
        console.log('Insert error:', insertError); // 👈 콘솔 로그 추가
        setMessage('재고 등록 실패');
        return;
      }
    }

    // 이력 기록 추가
    await supabase.from('stock_history').insert([
      {
        product_name: productName,
        option,
        quantity,
        change_type: '초기등록',
        note: '재고 등록',
      },
    ]);

    setMessage('✅ 재고가 성공적으로 등록되었습니다.');
    setProductName('');
    setOption('');
    setQuantity(0);
  };

  return (
    <div className="p-4 border rounded shadow max-w-md bg-white">
      <h2 className="text-xl font-bold mb-4">📦 초기 재고 등록</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="상품명"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="옵션 (선택사항)"
        value={option}
        onChange={(e) => setOption(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 mb-2 w-full"
        placeholder="수량"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleRegister}
      >
        등록하기
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default StockRegisterForm;