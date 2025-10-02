# JSON Paste Feature - AI Gallery Form

## Overview
Fitur JSON Paste memungkinkan user untuk mengimpor data secara cepat ke form AI Gallery dengan cara paste JSON data. Fitur ini sangat berguna untuk mengisi form dengan data yang sudah ada dalam format JSON.

## Features

### 1. Auto Fill Data
- ✅ **Title**: Otomatis mengisi field title
- ✅ **Tags**: Parsing tags dari string (comma-separated) atau array
- ✅ **Prompt**: Mengisi prompt/description/content

### 2. Smart JSON Parsing
- ✅ **Flexible Field Names**: Mendukung berbagai nama field
- ✅ **Tag Processing**: Otomatis split dan clean tags
- ✅ **Error Handling**: Validasi JSON dan error messages

### 3. User Interface
- ✅ **Collapsible Section**: Show/hide JSON import area
- ✅ **Clipboard Integration**: Tombol paste dari clipboard
- ✅ **Live Preview**: Real-time JSON input
- ✅ **Clear Instructions**: Placeholder dan contoh format

## Supported JSON Formats

### 1. Basic Format
```json
{
  "title": "Cobalt Contemplation: Reflections in an Ornate Mirror",
  "tags": "boy, male, back to viewer, reflection, profile, oversized shirt, loose shirt, cobalt blue",
  "prompt": "A contemplative scene in an upscale bathroom..."
}
```

### 2. Alternative Field Names
```json
{
  "title": "Your Artwork Title",
  "tags": ["tag1", "tag2", "tag3"],
  "description": "Your artwork description...",
  "content": "Alternative content field..."
}
```

### 3. Flexible Tags Format
```json
// String format (comma-separated)
{
  "tags": "ai-art, digital, abstract, portrait, landscape"
}

// Array format
{
  "tags": ["ai-art", "digital", "abstract", "portrait", "landscape"]
}
```

## How It Works

### 1. JSON Parsing Logic
```typescript
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
    
    // Extract prompt (multiple field names supported)
    const prompt = jsonData.prompt || jsonData.description || jsonData.content || ''
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      title,
      prompt,
      tags
    }))
  } catch (error) {
    alert('Invalid JSON format. Please check your JSON and try again.')
  }
}
```

### 2. Clipboard Integration
```typescript
const handlePasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    setJsonInput(text)
  } catch (error) {
    alert('Failed to read clipboard. Please paste manually.')
  }
}
```

## User Interface Components

### 1. Collapsible Import Section
```tsx
<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <div className="flex items-center justify-between mb-3">
    <div>
      <h3 className="text-sm font-medium text-blue-900">Quick Import from JSON</h3>
      <p className="text-xs text-blue-700">Paste JSON data to auto-fill title, tags, and prompt</p>
    </div>
    <button onClick={() => setShowJsonPaste(!showJsonPaste)}>
      {showJsonPaste ? 'Hide' : 'Show'} JSON Import
    </button>
  </div>
</div>
```

### 2. JSON Input Area
```tsx
<textarea
  value={jsonInput}
  onChange={handleJsonInputChange}
  placeholder='Paste your JSON here, e.g.:\n{\n  "title": "Cobalt Contemplation: Reflections in an Ornate Mirror",\n  "tags": "boy, male, back to viewer, reflection, profile"\n}'
  className="w-full h-32 px-3 py-2 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 font-mono"
/>
```

### 3. Action Buttons
```tsx
<div className="flex space-x-2">
  <button onClick={() => { setJsonInput(''); setShowJsonPaste(false); }}>
    Cancel
  </button>
  <button onClick={handleJsonPaste} disabled={!jsonInput.trim()}>
    Import Data
  </button>
</div>
```

## Usage Instructions

### 1. For Users
1. Click "Show JSON Import" button
2. Paste your JSON data in the textarea
3. Or click "Paste" button to paste from clipboard
4. Click "Import Data" to auto-fill the form
5. Review and modify the imported data as needed

### 2. Example Workflow
```
1. Copy JSON data from external source
2. Open AI Gallery create form
3. Click "Show JSON Import"
4. Click "Paste" button or manually paste JSON
5. Click "Import Data"
6. Form fields are automatically filled
7. Add images and submit form
```

## Error Handling

### 1. JSON Validation
- ✅ **Syntax Check**: Validates JSON syntax before parsing
- ✅ **Error Messages**: Clear error messages for invalid JSON
- ✅ **Graceful Fallback**: Form remains usable if import fails

### 2. Data Validation
- ✅ **Empty Fields**: Handles missing or empty fields gracefully
- ✅ **Type Checking**: Validates data types before processing
- ✅ **Sanitization**: Cleans and formats imported data

### 3. User Feedback
- ✅ **Success Message**: Shows what data was imported
- ✅ **Error Alerts**: Clear error messages for failures
- ✅ **Visual Feedback**: Loading states and button states

## Benefits

### 1. Productivity
- ⚡ **Fast Data Entry**: Import multiple fields at once
- ⚡ **Reduced Typing**: Copy-paste instead of manual entry
- ⚡ **Batch Processing**: Easy to process multiple artworks

### 2. Accuracy
- ✅ **No Typos**: Direct copy-paste reduces errors
- ✅ **Consistent Formatting**: Automatic tag processing
- ✅ **Data Integrity**: Validation ensures clean data

### 3. User Experience
- 🎯 **Intuitive Interface**: Clear instructions and feedback
- 🎯 **Flexible Input**: Multiple JSON formats supported
- 🎯 **Non-Destructive**: Can review before saving

## Browser Compatibility
- ✅ **Modern Browsers**: Chrome, Firefox, Safari, Edge
- ✅ **Clipboard API**: Supported in HTTPS contexts
- ✅ **Fallback**: Manual paste always works

## Security Considerations
- ✅ **Client-Side Only**: JSON parsing happens in browser
- ✅ **No External Requests**: No data sent to external services
- ✅ **Input Validation**: Sanitizes imported data
- ✅ **XSS Prevention**: Proper escaping of user input
