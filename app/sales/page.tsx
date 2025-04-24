'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductButtons from '../components/ProductButtons';
import OptionSelector from '../components/OptionSelector';
import RecordList from '../components/RecordList';
import LogoutButton from '../components/LogoutButton';
import { Product, RecordItem } from '../types';

const initialProducts: Product[] = [
  { name: '하세가와 미니가위', price: 8900, options: ['주황', '분홍', '연두', '파랑'] },
  { name: '모루인형', price: 8500, options: ['브라운', '그레이', '블랙'] },
  { name: '트롤자석', price: 2000 },
  { name: '미니메쉬 파우치', price: 3000, options: ['하트', '무지'] },
  { name: '라지메쉬파우치', price: 6000, options: ['하트', '무지'] },
  { name: 'L투명파우치', price: 6800 },
  { name: 'M투명파우치', price: 4900 },
  { name: '니켄과도', price: 6000, options: ['핑크톱니', '핑크민자', '민트톱니'] },
  { name: '라쿤수세미', price: 5000, options: ['베이지', '코코아', '카멜', '민트', '분홍', '레몬'] },
  { name: '미니라쿤', price: 5000, options: ['베이지', '코코아', '카멜', '민트', '분홍', '레몬'] },
  { name: '실바늘세트', price: 2000 },
];

export default function SalesPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProducts[0]);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (!id) {
      router.replace('/login');
    } else {
      setUser(id);
    }
  }, [router]);

  useEffect(() => {
    if (user && selectedDate) {
      const items = JSON.parse(localStorage.getItem(selectedDate) || '[]');
      if (Array.isArray(items)) {
        setRecords(items.sort((a, b) => {
          const at = a.time || '';
          const bt = b.time || '';
          return bt.localeCompare(at);
        }));
      }
    }
  }, [user, selectedDate]);

  const addRecord = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newRecord: RecordItem = {
      id: Date.now(),
      name: selectedProduct.name,
      price: selectedProduct.price,
      qty,
      option,
      time,
      date: selectedDate,
    };

    const saved = JSON.parse(localStorage.getItem(selectedDate) || '[]');
    const updated = [...saved, newRecord];
    localStorage.setItem(selectedDate, JSON.stringify(updated));
    setRecords(prev => [newRecord, ...prev]);
    setQty(1);
  };

  const deleteRecord = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const updated = records.filter(r => r.id !== id);
      localStorage.setItem(selectedDate, JSON.stringify(updated));
      setRecords(updated);
    }
  };

  const updatePrice = (index: number, newPrice: number) => {
    const updated = [...products];
    updated[index].price = newPrice;
    setProducts(updated);
  };

  if (!user) return null;

  return (
    <main className="p-4 max-w-2xl mx-auto bg-white text-black min-h-screen">
      <button
        onClick={() => router.push('/home')}
        className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        🏠 홈으로 돌아가기
      </button>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">플리마켓 판매</h1>
        <LogoutButton />
      </div>

      <label className="block font-semibold mb-1">날짜 선택:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <ProductButtons
        products={products}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setOption={setOption}
        updatePrice={updatePrice}
      />

      <OptionSelector
        product={selectedProduct}
        qty={qty}
        setQty={setQty}
        option={option}
        setOption={setOption}
        addRecord={addRecord}
      />

      <RecordList
        records={records}
        onDelete={(index: number) => deleteRecord(records[index].id)}
        showDate={true}
        title="판매 내역"
      />
    </main>
  );
}
