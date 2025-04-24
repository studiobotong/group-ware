'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const id = sessionStorage.getItem('id')
    if (id) {
      router.replace('/home') // 로그인 되어있으면 홈으로 이동
    }
  }, [router])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm />
    </main>
  )
}
