import { GetListItens } from '@/app/actions/itens/listItens'
import { GetListSearchCategory } from '@/app/actions/itens/search/GetListSearchCategory'
import { GetListSearchTitle } from '@/app/actions/itens/search/GetListSearchTitle'
import LinkPagination from '@/components/LinkPagination'
import LinkPaginationQuery from '@/components/LinkPaginationQuery'
import { ListItens } from '@/components/ListItens'
import { FormSearch } from '@/components/form-search'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { Suspense } from 'react'

interface SearchParamsProps {
  searchParams: {
    q: string
    c: string
    page: number
  }
}

export default async function SearchIten({ searchParams }: SearchParamsProps) {
  const { q: queryQ } = searchParams
  const { c: queryC } = searchParams

  let title = ''
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  let data = []
  let countPage = 0

  if (queryC && queryC !== '') {
    const datas = await GetListSearchCategory(queryC, page)
    const dt = await datas.json()
    data = dt.data
    countPage = dt.countPage
    title = `Categoria ${queryC}.`
  } else if (queryQ && queryQ !== '') {
    const datas = await GetListSearchTitle(queryQ, page)
    const dt = await datas.json()
    data = dt.data
    countPage = dt.countPage
    title = `${queryQ}`
  } else {
    const datas = await GetListItens(page)
    const dt = await datas.json()
    data = dt.data
    countPage = dt.countPage
    title = 'Todos os itens.'
  }

  function VerifyQuery() {
    if (queryC && queryC !== '') {
      return (
        <>
          <LinkPaginationQuery
            path={queryC}
            query={page}
            letter={'c'}
            countPage={countPage}
          />
        </>
      )
    } else if (queryQ && queryQ !== '') {
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
    <div className="max-md:w-[390px] mx-auto mt-5 space-y-5">
      <Suspense fallback={'Carregando...'}>
        <FormSearch />
        <p className="text-md font-normal">
          Pesquisado por:{' '}
          <span className="font-medium normal-case">{title}</span>
        </p>
        <div className="flex flex-wrap max-md:justify-center gap-5">
          {data.length > 0 ? (
            data.map((itens: InterfaceItens, index: number) => (
              <ListItens
                key={index}
                href={`/itens/${itens.idItens}`}
                src={itens.urlImage}
                alt={`Imagem do item, ${itens.title}`}
                width={150}
                height={150}
                title={itens.title}
                value={itens.value}
                waitTime={itens.waitTime}
              />
            ))
          ) : (
            <h1>Item pesquisado não encontrado.</h1>
          )}
        </div>
        <div className="max-md:h-28">
          <div className="flex justify-center mt-4 h-10">{VerifyQuery()}</div>
        </div>
      </Suspense>
    </div>
  )
}
