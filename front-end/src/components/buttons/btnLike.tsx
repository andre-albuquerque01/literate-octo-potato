'use client'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { InsertLike } from '@/actions/itens/rate/insertLike'
import { DeleteLike } from '@/actions/itens/rate/removeLike'

export const BtnLike = ({ id, data }: { id: string; data: boolean }) => {
  const router = useRouter()

  const hanldeLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const like = await InsertLike({ idItens: id })

    if (like.message === 'success') {
      alert('Avaliado!')
      router.refresh()
    } else if (like.message === 'Já avaliou') {
      alert('Já avaliou!')
    } else if (like.message === 'Unauthenticated.') {
      alert('Precisa fazer login!')
      router.push('/user/login')
    }
  }

  const hanldeDisLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const dislike = await DeleteLike(id)
    if (dislike) {
      alert('Removida avaliação!')
      // router.refresh()
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-md font-medium">Avaliar</p>
      <p className="flex gap-2">
        <button onClick={hanldeLike}>
          {data ? (
            <ThumbsUp className="w-6 h-6 bg-cyan-600 rounded-lg" />
          ) : (
            <ThumbsUp className="w-6 h-6" />
          )}
        </button>
        <button onClick={hanldeDisLike}>
          <ThumbsDown className="w-6 h-6" />
        </button>
      </p>
    </div>
  )
}
