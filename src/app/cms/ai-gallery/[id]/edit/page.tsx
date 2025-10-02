'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use, useCallback } from 'react'
import CMSHeader from '@/components/cms/CMSHeader'
import AIGalleryForm from '@/components/cms/AIGalleryForm'

interface AIGalleryItem {
  id: number
  title: string
  prompt: string
  tags: string[]
  images: {
    secure_url: string
    public_id: string
  }[]
}

export default function EditAIGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [item, setItem] = useState<AIGalleryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItem = useCallback(async () => {
    try {
      const response = await fetch(`/api/ai-gallery/${id}`)
      if (response.ok) {
        const data = await response.json()
        
        // Transform the data to match the form structure
        const transformedItem = {
          id: data.id,
          title: data.title,
          prompt: data.prompt,
          tags: data.tags,
          images: data.images?.map((img: { image_url: string; public_id: string }) => ({
            secure_url: img.image_url,
            public_id: img.public_id
          })) || []
        }
        
        setItem(transformedItem)
      } else if (response.status === 404) {
        setError('AI Gallery item not found')
      } else {
        setError('Failed to load AI Gallery item')
      }
    } catch (error) {
      console.error('Error fetching item:', error)
      setError('Failed to load AI Gallery item')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/auth/login')
    } else if (isLoaded && user) {
      fetchItem()
    }
  }, [isLoaded, user, router, fetchItem])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CMSHeader />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-red-400 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={() => router.push('/cms/ai-gallery')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CMSHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit AI Artwork</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update your AI-generated artwork details
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow rounded-lg p-6">
            {item && <AIGalleryForm item={item} />}
          </div>
        </div>
      </main>
    </div>
  )
}
