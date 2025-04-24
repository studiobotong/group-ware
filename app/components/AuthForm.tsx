'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const ADMIN_ID = 'botong';
  const ADMIN_PW = 'asd1568*';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id === ADMIN_ID && password === ADMIN_PW) {
      setMessage('✅ 로그인 성공');
      sessionStorage.setItem('id', id);  // 로그인 성공 시 저장

      setTimeout(() => {
        router.replace('/');
      }, 1000);
    } else {
      setMessage('❌ 아이디 또는 비밀번호가 틀렸습니다');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">로그인</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white p-2 w-full rounded"
        >
          로그인
        </button>
      </form>

      <p className="text-center mt-4">{message}</p>
    </div>
  );
}
