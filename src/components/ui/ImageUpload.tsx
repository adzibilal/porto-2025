'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface UploadedImage {
  secure_url: string
  public_id: string
}

interface ImageUploadProps {
  readonly images: UploadedImage[]
  readonly onChange: (images: UploadedImage[]) => void
  readonly maxImages?: number
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set())
  
  // Initialize loading state for all images when images change
  useEffect(() => {
    const initialLoading = new Set(images.map(img => img.public_id))
    setLoadingImages(initialLoading)
  }, [images])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return

    const remainingSlots = maxImages - images.length
    const filesToUpload = Array.from(files).slice(0, remainingSlots)

    setUploading(true)

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/ai-gallery/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const result = await response.json()
        console.log('Upload result:', result)
        return result
      })

      const uploadedImages = await Promise.all(uploadPromises)
      console.log('All uploaded images:', uploadedImages)
      onChange([...images, ...uploadedImages])
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload some images. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onChange(newImages)
  }

  const handleImageLoad = (publicId: string) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(publicId)
      return newSet
    })
    setErrorImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(publicId)
      return newSet
    })
  }

  const handleImageLoadStart = (publicId: string) => {
    setLoadingImages(prev => new Set(prev).add(publicId))
    setErrorImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(publicId)
      return newSet
    })
  }

  const handleImageError = (publicId: string) => {
    console.error('Image failed to load:', publicId)
    setLoadingImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(publicId)
      return newSet
    })
    setErrorImages(prev => new Set(prev).add(publicId))
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click()
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="hidden"
          />

          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-medium text-blue-600 hover:text-blue-500"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Click to upload'}
              </button>
              <span> or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB ({images.length}/{maxImages} images)
            </p>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => {
            console.log('Rendering image:', { url: image.secure_url, publicId: image.public_id })
            return (
              <div key={image.public_id} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  {image.secure_url ? (
                    <Image
                      src={image.secure_url}
                      alt={`Upload ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onLoad={() => handleImageLoad(image.public_id)}
                      onLoadStart={() => handleImageLoadStart(image.public_id)}
                      onError={(e) => {
                        console.error('Image load error:', e, image.secure_url)
                        handleImageError(image.public_id)
                      }}
                      unoptimized={true}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-500">No URL</p>
                      </div>
                    </div>
                  )}
                
                {/* Loading overlay */}
                {loadingImages.has(image.public_id) && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                )}
                
                {/* Error overlay */}
                {errorImages.has(image.public_id) && (
                  <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <p className="text-xs text-red-600">Failed to load</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay with controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    {/* Move left */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index - 1)}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    {/* Move right */}
                    {index < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index + 1)}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Order indicator */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
