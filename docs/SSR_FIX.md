# TipTap SSR Hydration Fix

## Problem
Error yang terjadi:
```
Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
```

## Root Cause
TipTap editor mengalami hydration mismatch karena:
1. Server-side rendering menghasilkan HTML yang berbeda dengan client-side
2. TipTap perlu dikonfigurasi khusus untuk Next.js SSR
3. Editor tidak menunggu client-side mounting selesai

## Solutions Applied

### 1. Set `immediatelyRender: false`
```typescript
const editor = useEditor({
  extensions: [StarterKit],
  content,
  immediatelyRender: false, // ✅ Fix SSR hydration
  onUpdate: ({ editor }) => {
    onChange(editor.getHTML())
  },
  // ...
})
```

### 2. Client-Side Only Rendering
```typescript
const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

if (!isMounted || !editor) {
  return <LoadingSkeleton />
}
```

### 3. ClientOnly Wrapper Component
```typescript
// ClientOnly.tsx
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
```

### 4. Graceful Loading State
```typescript
<ClientOnly
  fallback={
    <div className="border border-gray-300 rounded-md">
      <div className="border-b border-gray-300 p-2 bg-gray-50">
        <div className="flex space-x-1">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={`skeleton-${i}`} className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      <div className="min-h-[200px] p-4 flex items-center justify-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    </div>
  }
>
  <RichTextEditor {...props} />
</ClientOnly>
```

## Files Modified

1. **`src/components/ui/RichTextEditor.tsx`**
   - Added `immediatelyRender: false`
   - Added client-side mounting check
   - Added loading skeleton

2. **`src/components/ui/ClientOnly.tsx`** (New)
   - Wrapper component for client-only rendering
   - Prevents SSR hydration mismatches

3. **`src/components/cms/AIGalleryForm.tsx`**
   - Wrapped RichTextEditor with ClientOnly
   - Added fallback loading state

## Benefits

1. ✅ **No More Hydration Errors**: TipTap renders only on client-side
2. ✅ **Better UX**: Loading skeleton provides visual feedback
3. ✅ **Reusable Solution**: ClientOnly can be used for other SSR-sensitive components
4. ✅ **Performance**: No unnecessary server-side rendering of complex editor
5. ✅ **SEO Friendly**: Content still gets indexed (form data is separate)

## Usage

For any component that has SSR issues:

```typescript
import ClientOnly from '@/components/ui/ClientOnly'

<ClientOnly fallback={<LoadingSkeleton />}>
  <SSRSensitiveComponent />
</ClientOnly>
```

## Testing

1. Refresh page dengan hard reload (Ctrl+Shift+R)
2. Check browser console - tidak ada error hydration
3. Editor loading dengan smooth transition
4. Functionality tetap normal setelah loaded
