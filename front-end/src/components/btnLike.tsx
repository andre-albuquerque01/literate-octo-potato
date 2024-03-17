import Api from '@/data/api'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

async function Like(body: object) {
  try {
    const request = await Api('', {
      method: 'POST',
      body: JSON.stringify(body),
    })
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
  } catch (error) {
    console.error(error)
    throw error
  }
}



export const BtnLike = () => {
  const hanldeLike = async () => {}
  const hanldeDisLike = async () => {}

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
