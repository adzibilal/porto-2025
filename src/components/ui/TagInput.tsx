'use client'

import { useState, KeyboardEvent } from 'react'

interface TagInputProps {
  readonly tags: string[]
  readonly onChange: (tags: string[]) => void
  readonly placeholder?: string
  readonly maxTags?: number
  readonly id?: string
}

export default function TagInput({ tags, onChange, placeholder = "Add tags...", maxTags = 20, id }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange([...tags, trimmedTag])
    }
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        
        {tags.length < maxTags && (
          <input
            type="text"
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 placeholder-gray-500"
          />
        )}
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>Press Enter or comma to add tags</span>
        <span>{tags.length}/{maxTags} tags</span>
      </div>

      {/* Suggested tags */}
      <div className="flex flex-wrap gap-1">
        {['ai-art', 'digital', 'abstract', 'portrait', 'landscape', 'cyberpunk', 'fantasy', 'minimalist']
          .filter(suggestion => !tags.includes(suggestion))
          .slice(0, 6)
          .map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200 hover:text-gray-900 transition-colors"
              disabled={tags.length >= maxTags}
            >
              + {suggestion}
            </button>
          ))
        }
      </div>
    </div>
  )
}
