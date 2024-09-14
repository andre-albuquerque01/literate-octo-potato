import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}>
      <div>{children}</div>
    </ReCaptchaProvider>
  )
}
