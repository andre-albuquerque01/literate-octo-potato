'use client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface propsInterface {
  idItens: string
  idMenu: string
}

export const AddCartComanda = ({ idItens, idMenu }: propsInterface) => {
  const router = useRouter()
  const handleAdd = async (
    idItens: string,
    idMenu: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    router.push(`/order/insert?iten=${idItens}&menu=${idMenu}`)
  }
  return (
    <div title="Adicionar item" className="">
      <button onClick={(e) => handleAdd(idItens, idMenu, e)}>
        <Plus className="w-5 h-5 rounded-full border border-zinc-800 hover:bg-zinc-700 hover:text-white" />
      </button>
    </div>
  )
}
