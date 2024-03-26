import LinkPagination from '@/components/LinkPagination'
import { RemoveIten } from '@/components/removeItem'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft, PenBoxIcon, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedEventsResponse {
  data: InterfaceItens[]
  countPage: number
}

interface PropsSearchParams {
  searchParams: {
    page: number
  }
}

async function getFeaturedEvents(
  page: number,
): Promise<FeaturedEventsResponse> {
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

export default async function ListItens({ searchParams }: PropsSearchParams) {
  let { page: query } = searchParams || 1
  if (query === undefined) query = 1
  const { data, countPage } = await getFeaturedEvents(query)

  return (
    <div className="w-full">
      <div className="max-md:w-[90%] min-h-full max-md:mx-auto md:mt-4">
        <Link href="" className="flex items-center py-4 md:hidden">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <Link
          href="/itens/insert"
          className="flex items-center gap-2 w-[170px] py-2 text-sm max-md:mb-0 max-md:w-80 mt-3 border-b-2 border-transparent hover:border-red-600 transition duration-500"
        >
          <PlusCircle className="w-5 h-5" />
          Novo item
        </Link>
        <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-3">
          Lista de itens
        </p>
        <div className="flex flex-wrap max-md:justify-center gap-5 md:mt-4">
          {data.map((itens, index) => (
            <div
              className="flex justify-between gap-3 max-md:w-full max-h-36 md:w-[360px] max-w-96 shadow-xl p-2 border md:min-w-[320px] border-zinc-200 rounded-lg"
              key={index}
            >
              <div className="flex gap-3">
                <Image
                  src={itens.urlImage}
                  alt={`Imagem do ${itens.title}`}
                  width={150}
                  height={150}
                  className="rounded-lg max-h-[150px] max-w-[150px]"
                />
                <div className="flex flex-col justify-evenly">
                  <p className="font-medium text-lg text-wrap">{itens.title}</p>
                  <p className="font-medium text-md">
                    {itens.value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <RemoveIten id={itens.idItens} />
                <Link href={`/itens/update/${itens.idItens}`}>
                  <PenBoxIcon className="w-5 h-5 hover:text-zinc-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 h-10">
        <LinkPagination query={query} countPage={countPage} />
      </div>
    </div>
  )
}
