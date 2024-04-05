import LinkPagination from '@/components/LinkPagination'
import LinkPaginationQuery from '@/components/LinkPaginationQuery'
import { ListItens } from '@/components/ListItens'
import { FormSearch } from '@/components/form-search'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'

interface SearchParamsProps {
  searchParams: {
    q: string
    c: string
    page: number
  }
}

interface FeaturedEventsResponse {
  data: InterfaceItens[]
  countPage: number
}

async function GetTitle(
  title: string,
  page: number,
): Promise<FeaturedEventsResponse> {
  try {
    const response = await Api(`/itens/search/title/${title}?page=${page}`, {
      next: {
        revalidate: 60,
      },
    })
    const reqJson = await response.json()
    const countPage = reqJson.data.meta.last_page
    const data = reqJson.data.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}

async function GetCategory(
  typeCategory: string,
  page: number,
): Promise<FeaturedEventsResponse> {
  try {
    const response = await Api(
      `/itens/search/category/${typeCategory}?page=${page}`,
      {
        next: {
          revalidate: 60,
        },
      },
    )
    const reqJson = await response.json()
    const countPage = reqJson.data.meta.last_page
    const data = reqJson.data.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}

async function GetAll(page: number): Promise<FeaturedEventsResponse> {
  try {
    const response = await Api(`/itens/list/${page}`, {
      next: {
        revalidate: 60,
      },
    })
    const reqJson = await response.json()
    const countPage = reqJson.data.meta.last_page
    const data = reqJson.data.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}

export default async function ListItensens({
  searchParams,
}: SearchParamsProps) {
  const { q: queryQ } = searchParams
  const { c: queryC } = searchParams

  let title = ''
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  let data = []
  let countPage = 0

  if (queryC && queryC !== '') {
    const result = await GetCategory(queryC, page)
    data = result.data
    countPage = result.countPage
    title = `categoria ${queryC}.`
  } else if (queryQ && queryQ !== '') {
    const result = await GetTitle(queryQ, page)
    data = result.data
    countPage = result.countPage
    title = `${queryQ}`
  } else {
    const result = await GetAll(page)
    data = result.data
    countPage = result.countPage
    title = 'Todos os itens.'
  }

  async function VerifyQuery() {
    if (queryC && queryC !== '') {
      return (
        <>
          {' '}
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
          {' '}
          <LinkPaginationQuery
            path={queryC}
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
      <FormSearch />
      <p className="text-md font-normal">
        Pesquisado por: <span className="font-medium">{title}</span>
      </p>
      <div className="flex flex-wrap max-md:justify-center gap-5">
        {data.length > 0 ? (
          data.map((itens, index) => (
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
      <div className="flex justify-center mt-4 h-10">{VerifyQuery()}</div>
    </div>
  )
}
