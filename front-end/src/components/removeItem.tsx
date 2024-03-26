'use client'
import Api from '@/data/api'
import { Trash2 } from 'lucide-react'

async function deleteIten(id: number) {
  try {
    await Api(`/itens/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const RemoveIten = ({ id }: { id: number }) => {
  const handleRemove = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await deleteIten(id)
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
