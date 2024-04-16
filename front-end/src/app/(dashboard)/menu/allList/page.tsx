import { GetAllListMenu } from '@/app/actions/menu/getAllListMenu'
import { GetCpfMenu } from '@/app/actions/menu/getCpfMenu'
import LinkPagination from '@/components/LinkPagination'
import LinkPaginationQuery from '@/components/LinkPaginationQuery'
import { FormSearchMenuCPF } from '@/components/form-search-menuCpf'
import { MenuInterface } from '@/data/type/menu'
import { ArrowLeft, Edit, EyeIcon } from 'lucide-react'
import Link from 'next/link'

interface PropsSearchParams {
  searchParams: {
    page: number
    q: string
  }
}

export default async function allListMenu({ searchParams }: PropsSearchParams) {
  const { q: queryQ } = searchParams

  let title = ''
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  let data = []
  let countPage = 0

  if (queryQ && queryQ !== '') {
    const datas = await GetCpfMenu(queryQ, page)
    const dt = await datas.json()
    data = dt.data
    countPage = dt.countPage
    title = `CPF pesquisado: ${queryQ}`
  } else {
    const datas = await GetAllListMenu(page)
    const dt = await datas.json()
    data = dt.data
    countPage = dt.countPage
    title = 'Todos os pedidos.'
  }

  function VerifyQuery() {
    if (queryQ && queryQ !== '') {
      return (
        <>
          <LinkPaginationQuery
            path={queryQ}
            query={page}
            letter={'q'}
            countPage={countPage}
          />
        </>
      )
    } else {
      return (
        <>
          <LinkPagination query={page} countPage={countPage} />
        </>
      )
    }
  }

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <FormSearchMenuCPF />
      <div className="text-sm mt-5">{title && title}</div>
      <p className="text-xl mb-1 max-md:mb-0 mt-5">
        Lista de todos pedido, tanto aberto como fechados.
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
        <div className="flex justify-center mt-4 h-10">{VerifyQuery()}</div>
      </div>
    </div>
  )
}
