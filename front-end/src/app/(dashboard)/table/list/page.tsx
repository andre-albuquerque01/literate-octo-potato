import GetAllTableService from '@/app/actions/table/getAllTable'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft, Edit, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function GetAll() {
  const reqbody = await GetAllTableService()
  const dt = await reqbody.json()
  const data = dt.data.data

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
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
      <div className="space-y-5 mt-4">
        {data.map((table: TableInterface, key: number) => (
          <div className="" key={key}>
            <div className="flex mx-auto justify-between">
              <span className="max-w-96">Número: {table.numberMesa}</span>
              <span className="max-md:hidden truncate w-96 text-center">
                Capacidade: {table.lotacao}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/table/update/${table.idMesa}`}
                  title={`Editar o item, ${table.numberMesa}`}
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <Link
                  href={`/table/update/${table.idMesa}`}
                  title={`Excluir o item, ${table.numberMesa}`}
                >
                  <Trash2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="w-full h-[1px] bg-zinc-600"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
