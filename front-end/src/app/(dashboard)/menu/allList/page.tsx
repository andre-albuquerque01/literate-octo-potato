import { GetAllListMenu } from '@/actions/menu/getAllListMenu'
import { GetCpfMenu } from '@/actions/menu/getCpfMenu'
import LinkPagination from '@/components/LinkPagination'
import LinkPaginationQuery from '@/components/LinkPaginationQuery'
import { FormSearchMenuCPF } from '@/components/form-search-menuCpf'
import { GetAllMenuComponent } from '@/components/getAllMenu'
import { ArrowLeft } from 'lucide-react'
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
    const dt = await GetCpfMenu(queryQ, page)
    data = dt.data
    countPage = dt.countPage
    title = `CPF pesquisado: ${queryQ}`
  } else {
    const dt = await GetAllListMenu(page)
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
      <GetAllMenuComponent data={data} />
      <div className="max-md:h-28">
        <div className="flex justify-center mt-4 h-10">{VerifyQuery()}</div>
      </div>
    </div>
  )
}
