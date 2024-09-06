import { ReactNode } from 'react'
import { Header } from '@/components/nav/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'TUTU food',
  },
}

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto md:px-5 py-2 w-full max-w-[1200px] p-4 max-md:mb-20">
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
}
