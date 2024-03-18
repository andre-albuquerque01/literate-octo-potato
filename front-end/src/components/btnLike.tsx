'use client'
import Api from '@/data/api'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

async function Like(body: object) {
  try {
    const request = await Api('/rate/insert', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const reqBody = await request.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function Dislike(id: number) {
  try {
    const request = await Api(`/rate/destroy/${id}`, {
      method: 'DELETE',
    })
    const reqBody = await request.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function VirifyLike(id: number) {
  try {
    const request = await Api(`/rate/get/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

type ProspLike = {
  id: number
}

export const BtnLike = (props: ProspLike) => {
  const [data, setData] = useState()

  useEffect(() => {
    const handleData = async () => {
      const dt = await VirifyLike(props.id)
      setData(dt)
    }
    handleData()
  }, [])

  const hanldeLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const like = await Like({ idItens: props.id })
    if (like.message === 'sucess') {
      alert('Avaliado!')
    } else if (like.message === 'Já avaliou') {
      alert('Já avaliou!')
    }
  }

  const hanldeDisLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const dislike = await Dislike(props.id)
    if (dislike.message === 'sucess') alert('Removida avaliação!')
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
