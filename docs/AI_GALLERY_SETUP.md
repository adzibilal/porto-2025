# AI Gallery CRUD Setup Guide

## Overview
Fitur AI Gallery CRUD telah berhasil dibuat dengan komponen dan API routes yang lengkap. Berikut adalah panduan setup dan penggunaan.

## Database Schema
Jalankan SQL schema berikut di database PostgreSQL Anda:

```sql
-- File: sql/ai_gallery_schema.sql
-- AI Gallery Tables Schema

-- Tabel utama untuk AI Gallery items
CREATE TABLE ai_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    prompt TEXT,
    tags TEXT[], -- Array of tags
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan multiple images per AI Gallery item
CREATE TABLE ai_gallery_images (
    id SERIAL PRIMARY KEY,
    ai_gallery_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255), -- Cloudinary public_id untuk delete
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_gallery_id) REFERENCES ai_gallery(id) ON DELETE CASCADE
);

-- Index untuk performa yang lebih baik
CREATE INDEX idx_ai_gallery_created_at ON ai_gallery(created_at DESC);
CREATE INDEX idx_ai_gallery_tags ON ai_gallery USING GIN(tags);
CREATE INDEX idx_ai_gallery_images_gallery_id ON ai_gallery_images(ai_gallery_id);
```

## Environment Variables
Tambahkan variabel berikut ke file `.env.local`:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

## Cloudinary Setup
1. Buat akun di [Cloudinary](https://cloudinary.com/)
2. Dapatkan Cloud Name, API Key, dan API Secret dari dashboard
3. Buat Upload Preset:
   - Masuk ke Settings > Upload
   - Klik "Add upload preset"
   - Set mode ke "Unsigned" 
   - Atur folder ke "ai-gallery"
   - Simpan preset name

## Fitur yang Tersedia

### 1. CRUD Operations
- **Create**: Tambah artwork baru dengan multiple images
- **Read**: Lihat list dan detail artwork
- **Update**: Edit artwork dan gambar
- **Delete**: Hapus artwork (termasuk gambar di Cloudinary)

### 2. Komponen UI
- **RichTextEditor**: Text editor untuk prompt menggunakan TipTap
- **ImageUpload**: Upload multiple images dengan drag & drop
- **TagInput**: Input tags dengan suggestions
- **AIGalleryForm**: Form lengkap untuk create/edit

### 3. API Routes
- `GET /api/ai-gallery` - List semua items
- `POST /api/ai-gallery` - Create item baru
- `GET /api/ai-gallery/[id]` - Get item by ID
- `PUT /api/ai-gallery/[id]` - Update item
- `DELETE /api/ai-gallery/[id]` - Delete item
- `POST /api/ai-gallery/upload` - Upload image ke Cloudinary

### 4. Halaman CMS
- `/cms/ai-gallery` - List view dengan grid layout
- `/cms/ai-gallery/create` - Form create artwork
- `/cms/ai-gallery/[id]` - Detail view dengan image gallery
- `/cms/ai-gallery/[id]/edit` - Form edit artwork

## Struktur Data

### AI Gallery Item
```typescript
interface AIGalleryItem {
  id: number
  title: string
  prompt: string (HTML dari rich text editor)
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
```

## Dependencies yang Diinstall
```bash
npm install cloudinary @tiptap/react @tiptap/pm @tiptap/starter-kit
```

## Fitur Unggulan
1. **Multiple Image Upload**: Drag & drop dengan preview dan reorder
2. **Rich Text Editor**: TipTap editor untuk prompt dengan toolbar lengkap
3. **Tag System**: Input tags dengan suggestions dan autocomplete
4. **Image Management**: Automatic delete dari Cloudinary saat item dihapus
5. **Responsive Design**: Mobile-friendly UI
6. **Loading States**: Loading indicators untuk semua operations
7. **Error Handling**: Comprehensive error handling dan user feedback

## Cara Penggunaan
1. Akses `/cms/ai-gallery` untuk melihat list artwork
2. Klik "Add New Artwork" untuk create item baru
3. Upload gambar, isi title, prompt, dan tags
4. Klik "Create" untuk menyimpan
5. Gunakan "View Details", "Edit", atau "Delete" untuk manage items

## Keamanan
- Semua routes CMS protected dengan Clerk authentication
- Whitelist email checking di CMS layout
- File upload validation di Cloudinary
- SQL injection protection dengan parameterized queries

## Performance
- Image optimization otomatis via Cloudinary
- Database indexing untuk queries yang cepat
- Lazy loading untuk images
- Efficient API responses dengan proper data structure
