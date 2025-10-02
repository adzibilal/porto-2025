import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { checkEmailWhitelist } from '@/lib/supabase'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user from Clerk
    const { clerkClient } = await import('@clerk/nextjs/server')
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    
    if (!user.primaryEmailAddress) {
      return NextResponse.json(
        { error: 'No email found' },
        { status: 400 }
      )
    }

    const isWhitelisted = await checkEmailWhitelist(user.primaryEmailAddress.emailAddress)

    if (!isWhitelisted) {
      // Delete user if not whitelisted
      await client.users.deleteUser(userId)
      
      return NextResponse.json(
        { 
          isWhitelisted: false,
          message: 'Email tidak terdaftar dalam whitelist' 
        },
        { status: 403 }
      )
    }

    return NextResponse.json({
      isWhitelisted: true,
      email: user.primaryEmailAddress.emailAddress
    })
  } catch (error) {
    console.error('Error verifying whitelist:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
