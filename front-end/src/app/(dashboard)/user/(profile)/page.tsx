import { GetNameUser } from '@/app/actions/user/getNameUser'
import { Logout } from '@/components/logout'
import {
  Apple,
  BookAIcon,
  BookOpenCheck,
  History,
  Home,
  ListIcon,
  ListOrdered,
  PenLine,
  PlusCircle,
  Search,
  SquarePen,
  Table2,
} from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function User() {
  const cookiesStore = cookies()
  const r = cookiesStore.get('r')
  const data = await GetNameUser()

  function getDate() {
    let message = ''
    const date = new Date()
    const hours = date.getHours()
    if (hours >= 0) message = `Bom dia, ${data}!`
    else if (hours >= 12) message = `Boa tarde, ${data}!`
    else if (hours >= 18) message = `Boa noite, ${data}!`
    return message
  }

  return (
    <div className="mt-6 space-y-3 w-36 max-md:p-8 max-md:mt-0 max-md:w-56">
      <h1 className="">{getDate()}</h1>
      <Link
        href="/itens/search"
        className="flex items-center gap-2 md:hidden hover:underline"
      >
        <Home className="h-5 w-5" />
        Inicio
      </Link>
      <Link
        href="/itens/search"
        className="flex items-center gap-2 hover:underline"
      >
        <Search className="h-5 w-5" />
        Pesquisar
      </Link>
      <Link
        href="/user/update"
        className="flex items-center gap-2 hover:underline"
      >
        <SquarePen className="h-5 w-5" />
        Editar o perfil
      </Link>
      <Link
        href="/user/updatePasssword"
        className="flex items-center gap-2 hover:underline"
      >
        <PenLine className="h-5 w-5" />
        Alterar senha
      </Link>
      <Link
        href="/order/list"
        className={`flex items-center gap-2 hover:underline ${r?.value && 'hidden'}`}
      >
        <ListIcon className="h-5 w-5" />
        Pedido
      </Link>
      {r?.value === 'JesusIsKingADM' && (
        <>
          <Link
            href="/itens/list"
            className="flex items-center gap-2 hover:underline"
          >
            <Apple className="h-5 w-5" />
            Itens
          </Link>
          <Link
            href="/table"
            className="flex items-center gap-2 hover:underline"
          >
            <Table2 className="h-5 w-5" />
            Mesas
          </Link>
          <Link
            href="/menu/list"
            className="flex items-center w-[240px] gap-2 hover:underline"
          >
            <BookAIcon className="h-5 w-5" />
            Pedidos do cliente abertos
          </Link>
          <Link
            href="/menu/allList"
            className="flex items-center w-[170px] gap-2 hover:underline"
          >
            <ListOrdered className="h-5 w-5" />
            Todos os pedidos
          </Link>
          <Link
            href="/category/list"
            className="flex items-center gap-2 hover:underline"
          >
            <BookOpenCheck className="h-5 w-5" />
            Categorias
          </Link>
          <Link
            href="/user/updateFunction"
            className="flex items-center gap-2 hover:underline w-48"
          >
            <PlusCircle className="h-5 w-5" />
            Adicionar funcionário
          </Link>
        </>
      )}
      <Link
        href="/order/historic"
        className={`flex items-center gap-2 hover:underline ${r?.value && 'hidden'}`}
      >
        <History className="h-5 w-5" />
        Historico
      </Link>
      <Logout />
    </div>
  )
}
