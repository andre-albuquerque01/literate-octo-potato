'use client'
import { InsertLike } from '@/app/actions/itens/rate/insertLike'
import { DeleteLike } from '@/app/actions/itens/rate/removeLike'
import { VerifyLike } from '@/app/actions/itens/rate/verifyLike'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type ProspLike = {
  id: number
}

export const BtnLike = (props: ProspLike) => {
  const [data, setData] = useState('')

  useEffect(() => {
    const handleData = async () => {
      const reqbody = await VerifyLike(props.id)
      const dt = await reqbody.json()
      const dat = dt.data.data
      setData(dat)
    }
    handleData()
  })

  const hanldeLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const reqbody = await InsertLike({ idItens: props.id })
    const dt = await reqbody.json()
    const like = dt.data.data
    if (like.message === 'sucess') {
      alert('Avaliado!')
      window.location.reload()
    } else if (like.message === 'Já avaliou') {
      alert('Já avaliou!')
    } else if (like.message === 'Unauthenticated.') {
      alert('Precisa fazer login!')
      window.location.replace('/user/login')
    }
  }

  const hanldeDisLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const dislike = await DeleteLike(props.id)
    if (dislike) {
      alert('Removida avaliação!')
      window.location.reload()
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-md font-medium">Avaliar</p>
      <p className="flex gap-2">
        <button onClick={hanldeLike}>
          {data === 'true' ? (
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
