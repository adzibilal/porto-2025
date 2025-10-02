import { Metadata } from 'next'
import WhitelistChecker from '@/components/auth/WhitelistChecker'

export const metadata: Metadata = {
  title: 'CMS Dashboard',
  description: 'Content Management System Dashboard',
}

export default function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <WhitelistChecker>
      {children}
    </WhitelistChecker>
  )
}
