import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedido',
}

export default function Order({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
