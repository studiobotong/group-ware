'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StockRegisterForm from '../components/StockRegisterForm';
import StockForm from '../components/StockForm';
import StockList from '../components/StockList';
import StockHistory from '../components/StockHistory';
import Modal from '../components/Modal';

export default function StockPage() {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="p-8">
      <button
        onClick={() => router.push('/home')}
        className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        🏠 홈으로 돌아가기
      </button>
      <h1 className="text-2xl font-bold mb-6">🧾 재고 관리</h1>

      {/* 목록전 기능 버튼 */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowRegister(true)}
        >
          + 초기 재고 등록
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAdjust(true)}
        >
          🔄 수동 입초고/불량
        </button>
      </div>

      {/* 목록전 목록 보이기 */}
      <StockList refreshTrigger={refreshTrigger} />
      <StockHistory />

      {/* 목록전 드롭사용 마케 보여줍니다 */}
      {showRegister && (
        <Modal onClose={() => {
          setShowRegister(false);
          setRefreshTrigger(prev => prev + 1);
        }}>
          <StockRegisterForm />
        </Modal>
      )}
      {showAdjust && (
        <Modal onClose={() => {
          setShowAdjust(false);
          setRefreshTrigger(prev => prev + 1);
        }}>
          <StockForm />
        </Modal>
      )}
    </div>
  );
}
