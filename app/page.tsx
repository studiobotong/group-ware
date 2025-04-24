'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 여부 확인
    const id = sessionStorage.getItem('id');
    if (id) {
      router.replace('/home'); // 로그인된 경우 홈으로 이동
    } else {
      router.replace('/login'); // 로그인 안 된 경우 로그인 페이지로 이동
    }
  }, [router]);

  return null; // 로딩 중엔 아무것도 렌더링하지 않음
}
