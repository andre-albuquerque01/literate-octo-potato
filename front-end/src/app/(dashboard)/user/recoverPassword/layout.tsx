import { ReactNode } from 'react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

export const metadata: Metadata = {
  title: 'Recuperação de senha',
}

export default function User({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.has('token')
  if (token) redirect('/user')
  return (
    <div>
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
      >
        {children}
      </ReCaptchaProvider>
    </div>
  )
}
