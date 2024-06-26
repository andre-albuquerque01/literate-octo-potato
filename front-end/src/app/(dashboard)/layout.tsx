import { ReactNode } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'TUTU food',
  },
}

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto md:px-5 py-2 w-full h-screen max-w-[1600px]">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
