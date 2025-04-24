'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('id')  // 로그인 정보 삭제
    router.replace('/login')         // 로그인 페이지로 이동
  }

  return (
    <button
      onClick={handleLogout}
      className="border px-4 py-2 rounded hover:bg-gray-100"
    >
      로그아웃
    </button>
  )
}
