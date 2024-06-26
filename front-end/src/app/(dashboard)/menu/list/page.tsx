import GetAllMenuService from '@/app/actions/menu/getAllMenu'
import { MenuInterface } from '@/data/type/menu'
import { ArrowLeft, Edit, EyeIcon, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function listMenu() {
  const reqbody = await GetAllMenuService()
  const dt = await reqbody.json()
  const data = dt.data.data

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <Link
        href="/menu/insert"
        className="flex items-center gap-2 w-[170px] py-2 text-sm max-md:mb-0 max-md:w-80 mt-3 border-b-2 border-transparent hover:border-red-600 transition duration-500"
      >
        <PlusCircle className="w-5 h-5" />
        Nova comanda
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Lista de comandas abertas
      </p>
      <div className="space-y-5 mt-4">
        {data !== undefined && data.length > 0 ? (
          data.map((menu: MenuInterface, key: number) => (
            <div key={key}>
              <div className="flex mx-auto justify-between">
                <span className="max-w-96">Mesa: {menu.numberMesa}</span>
                <span className="max-md:hidden truncate w-96 text-center">
                  CPF cliente: {menu.cpf}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/menu/update/${menu.idMenu}`}
                    title={`Editar o item, ${menu.numberMesa}`}
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/order/comanda/${menu.idMenu}`}
                    title="Mostra o pedido"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="w-full h-[1px] bg-zinc-600"></div>
            </div>
          ))
        ) : (
          <h1>Nenhuma comanda aberta!</h1>
        )}
      </div>
    </div>
  )
}
