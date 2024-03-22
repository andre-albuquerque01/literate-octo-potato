'use client'
import Api from '@/data/api'
import { Trash2 } from 'lucide-react'

async function deleteItenOrder(id: number) {
  try {
    const request = await Api(`/order/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
    const reqBody = await request.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const RemoveItenComanda = ({ id }: { id: number }) => {
  const handleRemove = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const req = await deleteItenOrder(id)
    if (req.message === 'sucess') {
      alert('Item removido!')
    }
  }
  return (
    <div title="Remover item" className="">
      <button onClick={(e) => handleRemove(id, e)}>
        <Trash2 className="w-5 h-5 hover:text-zinc-600" />
      </button>
    </div>
  )
}
