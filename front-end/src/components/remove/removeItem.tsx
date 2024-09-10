'use client'
import { DeleteItens } from '@/actions/itens/deleteItens'
import { Trash2 } from 'lucide-react'

export const RemoveIten = ({ id }: { id: string }) => {
  const handleRemove = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Deseja excluir o item?')) await DeleteItens(id)
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
