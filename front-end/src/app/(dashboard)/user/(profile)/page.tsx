import { History, ListIcon, LogOut, Search, SquarePen } from 'lucide-react'
import Link from 'next/link'

export default function User() {
  return (
    <div className="mt-6 space-y-3 w-36">
      <Link href="/itens/search" className="flex items-center gap-2">
        <Search className="h-5 w-5" />
        Pesquisar
      </Link>
      <Link href="" className="flex items-center gap-2">
        <SquarePen className="h-5 w-5" />
        Editar o perfil
      </Link>
      <Link href="" className="flex items-center gap-2">
        <ListIcon className="h-5 w-5" />
        Pedido
      </Link>
      <Link href="" className="flex items-center gap-2">
        <History className="h-5 w-5" />
        Historico
      </Link>
      <Link href="" className="flex items-center gap-2">
        <LogOut className="h-5 w-5" />
        Sair
      </Link>
    </div>
  )
}
