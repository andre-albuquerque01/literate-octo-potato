import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Alterar usuário',
}
export default function Layout({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.has('token')
  if (!token) redirect('/user/login')
  return <div>{children}</div>
}
