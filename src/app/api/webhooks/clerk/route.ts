import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { checkEmailWhitelist } from '@/lib/supabase'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evt: {
    type: string;
    data: {
      id: string;
      email_addresses: Array<{
        id: string;
        email_address: string;
      }>;
      primary_email_address_id: string;
    };
  }

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as typeof evt
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data
    const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id)
    
    if (primaryEmail) {
      const isWhitelisted = await checkEmailWhitelist(primaryEmail.email_address)
      
      if (!isWhitelisted) {
        try {
          // Delete user if not whitelisted
          const client = await clerkClient()
          await client.users.deleteUser(id)
          
          console.log(`User ${primaryEmail.email_address} deleted - not in whitelist`)
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      } else {
        console.log(`User ${primaryEmail.email_address} allowed - in whitelist`)
      }
    }
  }

  return NextResponse.json({ received: true })
}
