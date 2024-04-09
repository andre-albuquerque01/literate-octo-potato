import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Mesa',
}

export default function Layout({ children }: { children: ReactNode }) {
  const cookiesStore = cookies()
  const r = cookiesStore.get('r')
  if (r?.value !== 'JesusIsKingADM') redirect('/user/login')
  return (
    <div className="mx-auto md:px-5 py-2 w-full h-screen max-w-[1600px]">
      {children}
    </div>
  )
}
