import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface WhitelistedEmail {
  id: string
  email: string
  created_at: string
}

export async function checkEmailWhitelist(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('whitelisted_emails')
      .select('email')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking whitelist:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Error checking whitelist:', error)
    return false
  }
}
