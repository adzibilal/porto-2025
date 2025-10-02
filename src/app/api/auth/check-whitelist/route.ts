import { NextRequest, NextResponse } from 'next/server'
import { checkEmailWhitelist } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const isWhitelisted = await checkEmailWhitelist(email)

    return NextResponse.json({
      isWhitelisted,
      email
    })
  } catch (error) {
    console.error('Error checking whitelist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
