import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.has('token')
  if (token) redirect('/user')
  return <div>{children}</div>
}
