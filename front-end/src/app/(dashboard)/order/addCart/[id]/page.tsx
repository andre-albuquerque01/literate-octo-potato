import LinkPagination from '@/components/pagination/LinkPagination'
import { AddCartComanda } from '@/components/menu/addCart'
import { FormSearchAddCart } from '@/components/forms/form-search-add-cart'
import { GoBack } from '@/components/nav/goBack'
import { InterfaceItens } from '@/data/type/interfaceItens'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { GetListSearchTitle } from '@/actions/itens/search/GetListSearchTitle'
import { GetListItens } from '@/actions/itens/listItens'
import LinkPaginationQuery from '@/components/pagination/LinkPaginationQuery'

interface SearchParamsProps {
  searchParams: {
    q: string
    page: number
  }
  params: {
    id: string
  }
}

export default async function AddCart({
  params,
  searchParams,
}: SearchParamsProps) {
  const { q: queryQ } = searchParams

  let title = ''
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  let data = []
  let countPage = 0

  if (queryQ && queryQ !== '') {
    const dt = await GetListSearchTitle(queryQ, page)
    data = dt.data
    countPage = dt.countPage
    title = `${queryQ}`
  } else {
    const dt = await GetListItens(page)
    data = dt.data
    countPage = dt.countPage
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
    <div className="w-full mx-auto mt-5 space-y-5">
      <Suspense fallback={'Carregando...'}>
        <GoBack />
        <FormSearchAddCart id={params.id} />
        <p className="text-md font-normal">
          Itens no cardápio {title && `- pesquisado por ${title}`}
        </p>
        <div className="flex flex-wrap gap-5">
          {data.map((itens: InterfaceItens, index: number) => (
            <Link
              href={`/itens/${itens.idItens}`}
              key={index}
              className="flex justify-between gap-3 max-md:w-full shadow-xl p-2 border md:w-[370px] border-zinc-200 rounded-lg transition-transform duration-200 overflow-hidden hover:scale-105"
            >
              <div className="flex gap-3">
                <Image
                  src={itens.urlImage}
                  alt={`Imagem do ${itens.title}`}
                  width={130}
                  height={130}
                  className="rounded-lg max-w-[130px] max-h-[115px] object-cover"
                />
                <div className="flex flex-col justify-evenly w-[155px]">
                  <p className="font-medium text-lg truncate">{itens.title}</p>
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
              <AddCartComanda idItens={itens.idItens} idMenu={params.id} />
            </Link>
          ))}
        </div>
        <div className="max-md:h-28">
          <div className="flex justify-center mt-4 h-10">{VerifyQuery()}</div>
        </div>
      </Suspense>
    </div>
  )
}
