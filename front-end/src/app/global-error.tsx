'use client'
import Link from 'next/link'

export default function GlobalError() {
  return (
    <html className="" lang="pt-br">
      <body className="bg-zinc-50 antialiased flex flex-col gap-5">
        <h1 className="font-bold text-lg">Um error ocorreu.</h1>
        <Link href="/dashboard" className="text-blue-600">
          Voltar para o inicio.
        </Link>
      </body>
    </html>
  )
}
