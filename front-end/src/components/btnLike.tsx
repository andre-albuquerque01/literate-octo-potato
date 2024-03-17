import Api from '@/data/api'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'

async function Like(body: object) {
  try {
    const request = await Api('', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const reqBody = await request.json()
    return reqBody
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function Dislike(body: object) {
  try {
    const request = await Api('', {
      method: 'DELETE',
    })
    const reqBody = await request.json()
    return reqBody
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function VirifyLike(id: number) {
  try {
    const request = await Api(`${id}`, {
      method: 'GET',
    })
    const reqBody = await request.json()
    return reqBody
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

  const hanldeLike = async () => {
    const like = await Like({ idIten: props.id })
    alert(like)
  }
  const hanldeDisLike = async () => {
    const like = await Dislike({ idIten: props.id })
    alert(like)
  }

  return (
    <div className="space-y-2">
      <p className="text-md font-medium">Avaliar</p>
      <p className="flex gap-4">
        <ThumbsUp className="w-6 h-6" />
        <ThumbsDown className="w-6 h-6" />
      </p>
    </div>
  )
}
