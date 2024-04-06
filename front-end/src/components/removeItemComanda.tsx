'use client'
import { DeleteOrder } from '@/app/actions/order/deleteOrder'
import { Trash2 } from 'lucide-react'

export const RemoveItenComanda = ({
  id,
  idComanda,
}: {
  id: number
  idComanda: number
}) => {
  const handleRemove = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await DeleteOrder(id, idComanda)
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
