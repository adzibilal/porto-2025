import { v2 as cloudinary } from 'cloudinary'

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Helper function untuk upload image
export const uploadToCloudinary = async (file: File): Promise<{
  secure_url: string
  public_id: string
}> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'ai_gallery')
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
  
  if (!response.ok) {
    throw new Error('Failed to upload image to Cloudinary')
  }
  
  return response.json()
}

// Helper function untuk delete image
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    throw error
  }
}
