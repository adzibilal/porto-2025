'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

interface RichTextEditorProps {
  readonly content: string
  readonly onChange: (content: string) => void
  readonly placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 text-gray-900 prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-em:text-gray-900',
      },
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!isMounted || !editor) {
    return (
      <div className="border border-gray-300 rounded-md">
        <div className="border-b border-gray-300 p-2 bg-gray-50">
          <div className="flex space-x-1">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`editor-skeleton-${i}`} className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="min-h-[200px] p-4 flex items-center justify-center">
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('strike') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          <s>S</s>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-sm text-gray-700 ${
            editor.isActive('blockquote') ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'
          }`}
        >
          "
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px]">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
