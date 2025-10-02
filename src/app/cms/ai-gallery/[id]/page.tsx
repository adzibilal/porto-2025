'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CMSHeader from '@/components/cms/CMSHeader'

interface AIGalleryItem {
  id: number
  title: string
  prompt: string
  tags: string[]
  created_at: string
  updated_at: string
  ai_gallery_images: {
    id: number
    image_url: string
    public_id: string
    display_order: number
  }[]
}

export default function ViewAIGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [item, setItem] = useState<AIGalleryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/auth/login')
    } else if (isLoaded && user) {
      fetchItem()
    }
  }, [isLoaded, user, router])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/ai-gallery/${id}`)
      if (response.ok) {
        const data = await response.json()
        setItem(data)
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
  }

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

  if (error || !item) {
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
                <p className="text-gray-500 mb-4">{error || 'Item not found'}</p>
                <Link
                  href="/cms/ai-gallery"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Back to Gallery
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const sortedImages = item.ai_gallery_images.sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="min-h-screen bg-gray-50">
      <CMSHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <Link
                href="/cms/ai-gallery"
                className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mb-2"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Gallery
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <p className="mt-2 text-sm text-gray-500">
                Created: {new Date(item.created_at).toLocaleDateString()} • 
                Updated: {new Date(item.updated_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/cms/ai-gallery/${item.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Images */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Main Image */}
                {sortedImages.length > 0 && (
                  <div className="relative w-full">
                    <Image
                      src={sortedImages[selectedImageIndex]?.image_url}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                    />
                  </div>
                )}

                {/* Image Thumbnails */}
                {sortedImages.length > 1 && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-6 gap-2">
                      {sortedImages.map((image, index) => (
                        <button
                          key={`image-${image.id}-${index}`}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-square relative rounded-md overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index
                              ? 'border-purple-500 ring-2 ring-purple-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={image.image_url}
                            alt={`${item.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt */}
              {item.prompt && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Prompt</h3>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.prompt }}
                  />
                </div>
              )}

              {/* Image Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Images:</span>
                    <span className="font-medium">{sortedImages.length}</span>
                  </div>
                  {sortedImages.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Image:</span>
                      <span className="font-medium">{selectedImageIndex + 1} of {sortedImages.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
