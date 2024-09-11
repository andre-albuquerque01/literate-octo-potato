'use client'
import { DeleteCategory } from '@/actions/category/deleteCategory'
import { Trash2 } from 'lucide-react'

export const RemoveCategory = ({ id }: { id: string }) => {
  const handleRemove = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Deseja excluir a categoria?')) await DeleteCategory(id)
  }
  return (
    <button onClick={(e) => handleRemove(id, e)} title="Deletar categoria">
      <Trash2 className="w-5 h-5 hover:text-zinc-600" />
    </button>
  )
}
