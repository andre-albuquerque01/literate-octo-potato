import {
  Apple,
  BookAIcon,
  History,
  Home,
  ListIcon,
  LogOut,
  Search,
  SquarePen,
} from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default function User() {
  const cookieStore = cookies()
  const r = cookieStore.has('r')
  return (
    <div className="mt-6 space-y-3 w-36 max-md:p-8 max-md:mt-0 max-md:w-56">
      <Link href="/itens/search" className="flex items-center gap-2 md:hidden">
        <Home className="h-5 w-5" />
        Inicio
      </Link>
      <Link href="/itens/search" className="flex items-center gap-2">
        <Search className="h-5 w-5" />
        Pesquisar
      </Link>
      <Link href="/user/update" className="flex items-center gap-2">
        <SquarePen className="h-5 w-5" />
        Editar o perfil
      </Link>
      <Link
        href="/order/list"
        className={`flex items-center gap-2 ${r && 'hidden'}`}
      >
        <ListIcon className="h-5 w-5" />
        Pedido
      </Link>
      {cookieStore.has('r') && (
        <>
          <Link href="/itens/list" className="flex items-center gap-2">
            <Apple className="h-5 w-5" />
            Itens
          </Link>
          <Link href="/menu/list" className="flex items-center gap-2">
            <BookAIcon className="h-5 w-5" />
            Pedidos do cliente
          </Link>
          <Link href="/category/list" className="flex items-center gap-2">
            <BookAIcon className="h-5 w-5" />
            Categorias
          </Link>
        </>
      )}
      <Link href="/order/historic" className="flex items-center gap-2">
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
