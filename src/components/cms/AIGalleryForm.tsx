'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/ui/RichTextEditor'
import ImageUpload from '@/components/ui/ImageUpload'
import TagInput from '@/components/ui/TagInput'
import ClientOnly from '@/components/ui/ClientOnly'

interface UploadedImage {
  secure_url: string
  public_id: string
}

interface AIGalleryItem {
  id?: number
  title: string
  prompt: string
  tags: string[]
  images?: UploadedImage[]
}

interface AIGalleryFormProps {
  readonly item?: AIGalleryItem
  readonly onSubmit?: (item: AIGalleryItem) => void
  readonly onCancel?: () => void
}

export default function AIGalleryForm({ item, onSubmit, onCancel }: AIGalleryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showJsonPaste, setShowJsonPaste] = useState(false)
  const [jsonInput, setJsonInput] = useState('')
  const [formData, setFormData] = useState<AIGalleryItem>({
    title: '',
    prompt: '',
    tags: [],
    images: []
  })

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        prompt: item.prompt || '',
        tags: item.tags || [],
        images: item.images || []
      })
    }
  }, [item])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }

    if (!formData.images || formData.images.length === 0) {
      alert('At least one image is required')
      return
    }

    setLoading(true)

    try {
      const url = item?.id ? `/api/ai-gallery/${item.id}` : '/api/ai-gallery'
      const method = item?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          prompt: formData.prompt,
          tags: formData.tags,
          images: formData.images
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save item')
      }

      const savedItem = await response.json()
      
      if (onSubmit) {
        onSubmit(savedItem)
      } else {
        router.push('/cms/ai-gallery')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Failed to save item. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      router.push('/cms/ai-gallery')
    }
  }

  const handleJsonPaste = () => {
    try {
      const jsonData = JSON.parse(jsonInput)
      
      // Extract title
      const title = jsonData.title || ''
      
      // Extract and process tags
      let tags: string[] = []
      if (jsonData.tags) {
        if (typeof jsonData.tags === 'string') {
          // Split by comma and clean up
          tags = jsonData.tags
            .split(',')
            .map((tag: string) => tag.trim().toLowerCase())
            .filter((tag: string) => tag.length > 0)
        } else if (Array.isArray(jsonData.tags)) {
          tags = jsonData.tags
            .map((tag: string) => tag.trim().toLowerCase())
            .filter((tag: string) => tag.length > 0)
        }
      }
      
      // Extract prompt (could be in different fields)
      const prompt = jsonData.prompt || jsonData.description || jsonData.content || ''
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        title,
        prompt,
        tags
      }))
      
      // Close modal and clear input
      setShowJsonPaste(false)
      setJsonInput('')
      
      alert(`Successfully imported:\n- Title: ${title}\n- Tags: ${tags.length} tags\n- Prompt: ${prompt ? 'Yes' : 'No'}`)
      
    } catch (error) {
      console.error('Error parsing JSON:', error)
      alert('Invalid JSON format. Please check your JSON and try again.')
    }
  }

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value)
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setJsonInput(text)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
      alert('Failed to read clipboard. Please paste manually.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* JSON Paste Section */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium text-blue-900">Quick Import from JSON</h3>
            <p className="text-xs text-blue-700">Paste JSON data to auto-fill title, tags, and prompt</p>
          </div>
          <button
            type="button"
            onClick={() => setShowJsonPaste(!showJsonPaste)}
            className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
          >
            {showJsonPaste ? 'Hide' : 'Show'} JSON Import
          </button>
        </div>
        
        {showJsonPaste && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={jsonInput}
                onChange={handleJsonInputChange}
                placeholder='Paste your JSON here, e.g.:\n{\n  "title": "Cobalt Contemplation: Reflections in an Ornate Mirror",\n  "tags": "boy, male, back to viewer, reflection, profile"\n}'
                className="w-full h-32 px-3 py-2 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 font-mono"
              />
              <button
                type="button"
                onClick={handlePasteFromClipboard}
                className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                title="Paste from clipboard"
              >
                <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Paste
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-blue-600">
                <strong>Supported formats:</strong> title, tags (string or array), prompt/description/content
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setJsonInput('')
                    setShowJsonPaste(false)
                  }}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleJsonPaste}
                  disabled={!jsonInput.trim()}
                  className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            placeholder="Enter a descriptive title for your AI artwork"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label htmlFor="images-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Images *
          </label>
          <ImageUpload
            images={formData.images || []}
            onChange={(images) => setFormData({ ...formData, images })}
            maxImages={10}
          />
        </div>

        {/* Prompt */}
        <div>
          <label htmlFor="prompt-editor" className="block text-sm font-medium text-gray-700 mb-2">
            Prompt
          </label>
          <ClientOnly
            fallback={
              <div className="border border-gray-300 rounded-md">
                <div className="border-b border-gray-300 p-2 bg-gray-50">
                  <div className="flex space-x-1">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={`fallback-skeleton-${i}`} className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div className="min-h-[200px] p-4 flex items-center justify-center">
                  <div className="text-gray-400">Loading editor...</div>
                </div>
              </div>
            }
          >
            <RichTextEditor
              content={formData.prompt}
              onChange={(content) => setFormData({ ...formData, prompt: content })}
              placeholder="Describe the AI prompt used to generate this artwork, techniques, or inspiration..."
            />
          </ClientOnly>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags-input" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <TagInput
            id="tags-input"
            tags={formData.tags}
            onChange={(tags) => setFormData({ ...formData, tags })}
            placeholder="Add tags to categorize your artwork..."
            maxTags={15}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Saving...' : (item?.id ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  )
}
