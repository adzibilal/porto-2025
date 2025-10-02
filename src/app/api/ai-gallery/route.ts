import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

// GET - Fetch all AI Gallery items
export async function GET() {
  try {
    const { data: galleryItems, error } = await supabase
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
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch gallery items' },
        { status: 500 }
      )
    }

    // Transform the data to match the expected structure
    const transformedItems = galleryItems?.map(item => ({
      ...item,
      images: item.ai_gallery_images || []
    })) || []

    // Remove the original ai_gallery_images field from each item
    transformedItems.forEach(item => {
      delete item.ai_gallery_images
    })

    return NextResponse.json(transformedItems)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new AI Gallery item
export async function POST(request: NextRequest) {
  try {
    const { title, prompt, tags, images } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Insert gallery item
    const { data: galleryItem, error: galleryError } = await supabase
      .from('ai_gallery')
      .insert({
        title,
        prompt,
        tags: tags || []
      })
      .select()
      .single()

    if (galleryError) {
      console.error('Error creating gallery item:', galleryError)
      return NextResponse.json(
        { error: 'Failed to create gallery item' },
        { status: 500 }
      )
    }

    // Insert images if provided
    if (images && images.length > 0) {
      const imageData = images.map((image: any, index: number) => ({
        ai_gallery_id: galleryItem.id,
        image_url: image.secure_url,
        public_id: image.public_id,
        display_order: index
      }))

      const { error: imagesError } = await supabase
        .from('ai_gallery_images')
        .insert(imageData)

      if (imagesError) {
        console.error('Error inserting images:', imagesError)
        // Rollback gallery item if images fail
        await supabase
          .from('ai_gallery')
          .delete()
          .eq('id', galleryItem.id)

        return NextResponse.json(
          { error: 'Failed to save images' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
