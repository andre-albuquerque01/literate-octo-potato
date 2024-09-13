import GetAllTableService from '@/actions/table/getAllTable'
import { TableListComponent } from '@/components/table/tableList'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function List() {
  const data = await GetAllTableService()

  return (
    <div className="flex flex-col w-full px-3">
      <Link
        href="/table"
        className="flex items-center gap-1 text-sm w-96 mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <Link
        href="/table/insert"
        className="flex items-center gap-2 w-[170px] py-2 text-sm max-md:mb-0 max-md:w-80 mt-3 border-b-2 border-transparent hover:border-red-600 transition duration-500"
      >
        <PlusCircle className="w-5 h-5" />
        Adicionar mesa
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Lista das mesas cadastradas
      </p>
      <TableListComponent data={data} />
    </div>
  )
}
