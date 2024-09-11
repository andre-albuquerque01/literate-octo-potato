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
      className="flex items-center gap-1 text-sm w-96 mt-3 max-md:w-80 cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
      Voltar
    </div>
  )
}
