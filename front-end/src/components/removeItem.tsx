'use client'
import { DeleteItens } from '@/app/actions/itens/deleteItens'
import { Trash2 } from 'lucide-react'

export const RemoveIten = ({ id }: { id: number }) => {
  const handleRemove = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await DeleteItens(id)
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
