import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const { userId } = await auth()
    
    if (userId) {
      const client = await clerkClient()
      await client.users.deleteUser(userId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error signing out:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
