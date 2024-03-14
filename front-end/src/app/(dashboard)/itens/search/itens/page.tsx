import { ListItens } from '@/components/ListItens'
import { FormSearch } from '@/components/form-search'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'

interface SearchParamsProps {
  searchParams: {
    q: string
    c: string
  }
}

async function GetTitle(title: string): Promise<InterfaceItens[]> {
  try {
    const request = await Api(`/itens/search/title/${title}`, {
      next: {
        revalidate: 60,
      },
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function GetCategory(typeCategory: string): Promise<InterfaceItens[]> {
  try {
    const request = await Api(`/itens/search/category/${typeCategory}`, {
      next: {
        revalidate: 60,
      },
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function GetAll() {
  try {
    const request = await Api(`/itens/home`, {
      // next: {
      //   revalidate: 60,
      // },
      cache: 'no-cache',
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function ListItensens({
  searchParams,
}: SearchParamsProps) {
  const { q: queryQ } = searchParams
  const { c: queryC } = searchParams

  let title = ''
  let data: InterfaceItens[] = []

  if (queryC && queryC !== '') {
    data = await GetCategory(queryC)
    title = `categoria ${queryC}.`
  } else if (queryQ && queryQ !== '') {
    data = await GetTitle(queryQ)
    title = `${queryQ}`
  } else {
    data = await GetAll()
    title = 'Todos os itens.'
  }

  return (
    <div className="max-md:w-[360px] mx-auto mt-5 space-y-5">
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
    </div>
  )
}
