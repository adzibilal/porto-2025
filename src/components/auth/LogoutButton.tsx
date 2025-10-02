'use client'

import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
  readonly children?: React.ReactNode
  readonly className?: string
}

export default function LogoutButton({ children, className }: LogoutButtonProps) {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
      // Fallback redirect
      window.location.href = '/auth/login'
    }
  }

  return (
    <button
      onClick={handleLogout}
      className={className || "text-sm text-gray-700 hover:text-gray-900"}
    >
      {children || 'Logout'}
    </button>
  )
}
