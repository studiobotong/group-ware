'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StockItem {
  id: string;
  product_name: string;
  option: string | null;
  quantity: number;
  updated_at: string;
}

interface GroupedStock {
  key: string;
  product_name: string;
  option: string | null;
  total_quantity: number;
  last_updated: string;
}

const StockList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [groupedStocks, setGroupedStocks] = useState<GroupedStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('stocks')
        .select('*');

      if (error) {
        console.error('재고 불러오기 오류:', error);
        setLoading(false);
        return;
      }

      const groupedMap = new Map<string, GroupedStock>();

      data?.forEach((item: StockItem) => {
        const key = `${item.product_name}__${item.option || ''}`;
        const existing = groupedMap.get(key);

        if (existing) {
          existing.total_quantity += item.quantity;
          // 최신 수정일 업데이트
          if (new Date(item.updated_at) > new Date(existing.last_updated)) {
            existing.last_updated = item.updated_at;
          }
        } else {
          groupedMap.set(key, {
            key,
            product_name: item.product_name,
            option: item.option,
            total_quantity: item.quantity,
            last_updated: item.updated_at,
          });
        }
      });

      setGroupedStocks(Array.from(groupedMap.values()));
      setLoading(false);
    };

    fetchStocks();
  }, [refreshTrigger]);

  if (loading) return <p>불러오는 중...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">📋 현재 재고 목록 (합산)</h2>
      {groupedStocks.length === 0 ? (
        <p>등록된 재고가 없습니다.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">상품명</th>
              <th className="border px-2 py-1">옵션</th>
              <th className="border px-2 py-1">총 수량</th>
              <th className="border px-2 py-1">최종 수정일</th>
            </tr>
          </thead>
          <tbody>
            {groupedStocks.map((stock) => (
              <tr key={stock.key}>
                <td className="border px-2 py-1">{stock.product_name}</td>
                <td className="border px-2 py-1">{stock.option || '-'}</td>
                <td className="border px-2 py-1">{stock.total_quantity}</td>
                <td className="border px-2 py-1">
                  {new Date(stock.last_updated).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockList;