import { GetAllListMenu } from '@/app/actions/menu/getAllListMenu'
import LinkPagination from '@/components/LinkPagination'
import { MenuInterface } from '@/data/type/menu'
import { ArrowLeft, Edit, EyeIcon } from 'lucide-react'
import Link from 'next/link'

interface PropsSearchParams {
  searchParams: {
    page: number
  }
}

export default async function allListMenu({ searchParams }: PropsSearchParams) {
  let { page: query } = searchParams || 1
  if (query === undefined) query = 1
  const datas = await GetAllListMenu(query)
  const dt = await datas.json()
  const data = dt.data
  const countPage = dt.countPage

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Lista de pedido, tanto aberto como fechados
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
          <h1>Nenhuma comanda!</h1>
        )}
      </div>
      <div className="max-md:h-28">
        <div className="flex justify-center mt-4 h-10">
          <LinkPagination query={query} countPage={countPage} />
        </div>
      </div>
    </div>
  )
}
