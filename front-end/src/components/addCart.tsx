'use client'
import { Plus } from 'lucide-react'

interface propsInterface {
  idItens: number
  idMenu: number
}

export const AddCartComanda = ({ idItens, idMenu }: propsInterface) => {
  const handleAdd = async (
    idItens: number,
    idMenu: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    window.location.replace(`/order/insert?iten=${idItens}&menu=${idMenu}`)
  }
  return (
    <div title="Adicionar item" className="">
      <button onClick={(e) => handleAdd(idItens, idMenu, e)}>
        <Plus className="w-5 h-5 rounded-full border border-zinc-800 hover:bg-zinc-700 hover:text-white" />
      </button>
    </div>
  )
}
