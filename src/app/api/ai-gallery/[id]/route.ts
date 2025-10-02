import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { deleteFromCloudinary } from '@/lib/cloudinary'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

// GET - Fetch single AI Gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: galleryItem, error } = await supabase
      .from('ai_gallery')
      .select(`
        *,
        ai_gallery_images (
          id,
          image_url,
          public_id,
          display_order
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the expected structure
    const transformedItem = {
      ...galleryItem,
      images: galleryItem.ai_gallery_images || []
    }

    // Remove the original ai_gallery_images field
    delete transformedItem.ai_gallery_images

    return NextResponse.json(transformedItem)
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update AI Gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { title, prompt, tags, images, imagesToDelete } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Update gallery item
    const { data: galleryItem, error: updateError } = await supabase
      .from('ai_gallery')
      .update({
        title,
        prompt,
        tags: tags || []
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating gallery item:', updateError)
      return NextResponse.json(
        { error: 'Failed to update gallery item' },
        { status: 500 }
      )
    }

    // Delete images if specified
    if (imagesToDelete && imagesToDelete.length > 0) {
      // Delete from Cloudinary
      for (const publicId of imagesToDelete) {
        try {
          await deleteFromCloudinary(publicId)
        } catch (error) {
          console.error('Error deleting from Cloudinary:', error)
        }
      }

      // Delete from database
      const { error: deleteError } = await supabase
        .from('ai_gallery_images')
        .delete()
        .in('public_id', imagesToDelete)

      if (deleteError) {
        console.error('Error deleting images from database:', deleteError)
      }
    }

    // Add new images if provided
    if (images && images.length > 0) {
      const imageData = images.map((image: { secure_url: string; public_id: string }, index: number) => ({
        ai_gallery_id: galleryItem.id,
        image_url: image.secure_url,
        public_id: image.public_id,
        display_order: index
      }))

      const { error: imagesError } = await supabase
        .from('ai_gallery_images')
        .insert(imageData)

      if (imagesError) {
        console.error('Error inserting new images:', imagesError)
        return NextResponse.json(
          { error: 'Failed to save new images' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete AI Gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Get images to delete from Cloudinary
    const { data: images } = await supabase
      .from('ai_gallery_images')
      .select('public_id')
      .eq('ai_gallery_id', id)

    // Delete images from Cloudinary
    if (images && images.length > 0) {
      for (const image of images) {
        try {
          await deleteFromCloudinary(image.public_id)
        } catch (error) {
          console.error('Error deleting from Cloudinary:', error)
        }
      }
    }

    // Delete gallery item (images will be deleted by CASCADE)
    const { error } = await supabase
      .from('ai_gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting gallery item:', error)
      return NextResponse.json(
        { error: 'Failed to delete gallery item' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
