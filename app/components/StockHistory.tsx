'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface HistoryItem {
  id: string;
  product_name: string;
  option: string | null;
  quantity: number;
  change_type: string;
  note: string;
  created_at: string;
}

const StockHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('stock_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('이력 불러오기 오류:', error);
      } else {
        setHistory(data as HistoryItem[]);
      }

      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">📚 재고 변동 이력</h2>
      {history.length === 0 ? (
        <p>이력이 없습니다.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">상품명</th>
              <th className="border px-2 py-1">옵션</th>
              <th className="border px-2 py-1">수량</th>
              <th className="border px-2 py-1">유형</th>
              <th className="border px-2 py-1">비고</th>
              <th className="border px-2 py-1">일시</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">{item.product_name}</td>
                <td className="border px-2 py-1">{item.option || '-'}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">{item.change_type}</td>
                <td className="border px-2 py-1">{item.note || '-'}</td>
                <td className="border px-2 py-1">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockHistory;