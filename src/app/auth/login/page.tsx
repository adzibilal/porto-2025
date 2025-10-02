'use client'

import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Masuk ke CMS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Gunakan akun Gmail yang terdaftar
          </p>
        </div>
        
        <div className="flex justify-center">
          <SignIn 
            forceRedirectUrl="/cms"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}