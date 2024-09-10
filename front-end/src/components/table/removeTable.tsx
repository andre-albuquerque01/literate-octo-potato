'use client'
import { DeleteTable } from '@/actions/table/deleteCategory'
import { Trash2 } from 'lucide-react'

export const RemoveTable = ({ id }: { id: string }) => {
  const handleRemove = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Deseja excluir a mesa?')) await DeleteTable(id)
  }
  return (
    <button onClick={(e) => handleRemove(id, e)} title="Remover table">
      <Trash2 className="w-5 h-5 hover:text-zinc-600" />
    </button>
  )
}
