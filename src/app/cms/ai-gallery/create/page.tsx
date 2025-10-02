'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CMSHeader from '@/components/cms/CMSHeader'
import AIGalleryForm from '@/components/cms/AIGalleryForm'

export default function CreateAIGalleryPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/auth/login')
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CMSHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Add New AI Artwork</h1>
            <p className="mt-2 text-sm text-gray-600">
              Create a new entry for your AI-generated artwork collection
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <AIGalleryForm />
          </div>
        </div>
      </main>
    </div>
  )
}
