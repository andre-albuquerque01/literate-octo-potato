import { TableInterface } from '@/data/type/table'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import { RemoveTable } from './removeTable'

export const TableListComponent = ({ data }: { data: TableInterface[] }) => {
  return (
    <div className="space-y-5 mt-4">
      {data &&
        data.length > 0 &&
        data.map((table, key) => (
          <div className="p-4 bg-white shadow rounded-lg" key={key}>
            <div className="flex justify-between items-center">
              <span className="max-w-96">Número: {table.numberMesa}</span>
              <span className="max-md:hidden truncate w-96 text-center">
                Capacidade: {table.lotacao}
              </span>
              <div className="flex items-center  gap-3">
                <Link href={`/table/update/${table.idMesa}`} passHref>
                  <span title={`Editar o item, ${table.numberMesa}`}>
                    <Edit className="w-5 h-5" />
                  </span>
                </Link>
                <RemoveTable id={table.idMesa} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
