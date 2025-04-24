'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-8">스튜디오 보통 관리자 홈</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => handleNavigate('/sales')}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          📋 플리마켓 판매기록 보기
        </button>

        <button
          onClick={() => handleNavigate('/stock')}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          📦 재고관리 페이지로 이동
        </button>

        <button
          onClick={() => alert('준비 중입니다.')}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded cursor-not-allowed"
        >
          🛠 기능 준비중
        </button>
      </div>
    </main>
  );
}