'use client'
import { Plus } from 'lucide-react'

export const AddCartComanda = ({ id }: { id: number }) => {
  const handleAdd = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    console.log(id)
  }
  return (
    <div title="adicionar item" className="">
      <button onClick={(e) => handleAdd(id, e)}>
        <Plus className="w-5 h-5 rounded-full border border-zinc-800 hover:bg-zinc-700 hover:text-white" />
      </button>
    </div>
  )
}
