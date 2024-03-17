import { ThumbsDown, ThumbsUp } from 'lucide-react'


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
