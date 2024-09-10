'use client'
import { DeleteOrder } from '@/actions/order/deleteOrder'
import { Trash2 } from 'lucide-react'

export const RemoveItenComanda = ({
  id,
  idComanda,
}: {
  id: string
  idComanda: string
}) => {
  const handleRemove = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (confirm('Deseja remover?')) await DeleteOrder(id, idComanda)
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
