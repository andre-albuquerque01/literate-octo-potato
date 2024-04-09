import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pesquisa',
}

export default function Itens({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
