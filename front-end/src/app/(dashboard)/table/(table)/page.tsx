import { TableStatus } from '@/components/Table-status'
import Api from '@/data/api'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

async function getAll(): Promise<TableInterface[]> {
  try {
    const request = await Api('/table/getAll', {
      method: 'GET',
      cache: 'no-cache',
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function Tables() {
  const data = await getAll()

  return (
    <div className="max-md:w-[80%] max-md:mx-auto md:mt-4">
      <Link href="" className="flex items-center py-4 md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <h1 className="text-2xl">Mesas</h1>
      <div className="max-md:space-y-5 mt-5 md:flex md:gap-5 md:flex-wrap md:items-center md:w-full">
        {data.map((table, index) => (
          <TableStatus
            key={index}
            numberTable={table.numberMesa}
            lotacao={table.lotacao}
            statusMesa={table.statusMesa}
            idMesa={table.idMesa}
          />
        ))}
      </div>
    </div>
  )
}
