import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    template: '%',
    default: 'TUTU food',
  },
  description: 'Cardapio digital',
  keywords: 'Cardapio digital',
  authors: {
    name: 'André',
    url: 'https://ae.dev.br/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.variable} lang="pt-br">
      <body className="bg-zinc-50 antialiased">{children}</body>
    </html>
  )
}
