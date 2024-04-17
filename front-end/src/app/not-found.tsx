'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-lg">Página não encontrada.</h1>
      <Link href="/dashboard" className="text-blue-600">
        Volte para o inicio.
      </Link>
    </div>
  )
}
