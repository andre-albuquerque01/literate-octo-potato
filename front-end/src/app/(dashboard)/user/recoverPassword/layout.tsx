import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperação de senha',
}

export default function User({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
