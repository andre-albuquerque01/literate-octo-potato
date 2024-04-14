'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GoBack = () => {
  const router = useRouter()
  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        router.back()
      }}
      className="flex items-center py-4 md:hidden"
    >
      <ArrowLeft className="w-5 h-5" />
      Voltar
    </div>
  )
}
