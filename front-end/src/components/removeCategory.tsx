'use client'
import { DeleteCategory } from '@/app/actions/category/deleteCategory'
import { Trash2 } from 'lucide-react'

export const RemoveCategory = ({ id }: { id: number }) => {
  const handleRemove = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await DeleteCategory(id)
  }
  return (
    <div title="Deletar categoria" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
