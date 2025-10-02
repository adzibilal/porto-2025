'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface WhitelistCheckerProps {
  readonly children: React.ReactNode
}

export default function WhitelistChecker({ children }: WhitelistCheckerProps) {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogoutAndRedirect = async () => {
    try {
      await signOut()
      // Clear any additional data if needed
      window.location.href = '/auth/login'
    } catch (error) {
      console.error('Error during logout:', error)
      // Force redirect even if logout fails
      window.location.href = '/auth/login'
    }
  }

  const checkWhitelist = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setError('Email tidak ditemukan')
      setIsChecking(false)
      return
    }

    try {
      const response = await fetch('/api/auth/check-whitelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.isWhitelisted) {
          setIsWhitelisted(true)
        } else {
          setError('Email Anda tidak terdaftar dalam whitelist. Silakan hubungi administrator.')
          // Logout and redirect after delay
          setTimeout(() => {
            handleLogoutAndRedirect()
          }, 3000)
        }
      } else {
        setError('Terjadi kesalahan saat memeriksa akses')
        setTimeout(() => {
          handleLogoutAndRedirect()
        }, 3000)
      }
    } catch (error) {
      console.error('Error checking whitelist:', error)
      setError('Terjadi kesalahan saat memeriksa akses')
      setTimeout(() => {
        handleLogoutAndRedirect()
      }, 3000)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      // Only check whitelist if user is authenticated
      checkWhitelist()
    } else if (isLoaded && !user) {
      // If no user, redirect to login
      router.push('/auth/login')
    }
  }, [isLoaded, user, router])

  // Don't render anything if user is not loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if no user
  if (!user) {
    return null
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memeriksa akses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Akses Ditolak</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-sm text-red-600 mb-4">Anda akan logout dan diarahkan ke halaman login...</p>
            <button
              onClick={handleLogoutAndRedirect}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout dan Kembali ke Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !isWhitelisted) {
    return null
  }

  return <>{children}</>
}
