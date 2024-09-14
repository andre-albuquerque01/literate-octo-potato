import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Alterar função',
}
export default function Layout({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const r = cookiesStore.get('r')
  if (r?.value !== 'JesusIsKingADM') redirect('/user/login')
  return <div>{children}</div>
}
