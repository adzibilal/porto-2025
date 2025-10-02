'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      // Langsung redirect ke CMS setelah login berhasil
      // Whitelist checking akan dilakukan di CMS layout
      router.push('/cms')
    } else if (isLoaded && !user) {
      router.push('/auth/login')
    }
  }, [isLoaded, user, router])

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Mengarahkan...</p>
      </div>
    </div>
  )
}
