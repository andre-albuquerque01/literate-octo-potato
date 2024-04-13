'use client'
import { InsertLike } from '@/app/actions/itens/rate/insertLike'
import { DeleteLike } from '@/app/actions/itens/rate/removeLike'
import { VerifyLike } from '@/app/actions/itens/rate/verifyLike'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ProspLike = {
  id: number
}

export const BtnLike = (props: ProspLike) => {
  const [data, setData] = useState<boolean>()
  const router = useRouter()

  useEffect(() => {
    const handleData = async () => {
      const reqbody = await VerifyLike(props.id)
      const dat = reqbody
      setData(dat)
    }
    handleData()
  })

  const hanldeLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const like = await InsertLike({ idItens: props.id })

    if (like.message === 'sucess') {
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
    const dislike = await DeleteLike(props.id)
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
