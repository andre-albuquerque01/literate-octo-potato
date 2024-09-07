import GetAllMenuService from '@/actions/menu/getAllMenu'
import { GetCpfOpenMenu } from '@/actions/menu/getCpfOpenMenu'
import { FormSearchMenuCPF } from '@/components/forms/form-search-menuCpf'
import { GetAllMenuComponent } from '@/components/menu/getAllMenu'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'

interface PropsSearchParams {
  searchParams: {
    page: number
    q: string
  }
}

export default async function listMenu({ searchParams }: PropsSearchParams) {
  const { q: queryQ } = searchParams

  let { page } = searchParams || 1
  if (page === undefined) page = 1

  let data = []

  if (queryQ && queryQ !== '') {
    const dt = await GetCpfOpenMenu(queryQ)
    data = dt
  } else {
    const dt = await GetAllMenuService()
    data = dt
  }

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
        className="flex items-center gap-1 text-sm w-96 mt-5 max-md:w-80"
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
      <FormSearchMenuCPF />
      <GetAllMenuComponent data={data} />
    </div>
  )
}
