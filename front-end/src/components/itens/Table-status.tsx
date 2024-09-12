'use client'
import { UpdateTable } from '@/actions/table/updateTable'
import { TableInterface } from '@/data/type/table'
import { X, CheckCircle } from 'lucide-react'

export const TableStatus = ({ data }: { data: TableInterface[] }) => {
  const handleBlock = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await UpdateTable({ statusMesa: 1 }, id)
    if (table === 'success') {
      alert('Mesa torna-se ocupada!')
    }
  }

  const handleOpen = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await UpdateTable({ statusMesa: 0 }, id)
    if (table === 'sucess') {
      alert('Mesa torna-se vazia!')
    }
  }

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((table, index) => (
          <div
            key={index}
            className="md:w-[20%] flex justify-between items-center border border-zinc-400 p-4 shadow-md"
          >
            <div className="">
              <p>Mesa {table.numberMesa}</p>
              <p className="">{table.statusMesa === 0 ? 'Vazia' : 'Ocupada'}</p>
            </div>
            {table.statusMesa === 0 ? (
              <button onClick={(e) => handleBlock(table.idMesa, e)}>
                <CheckCircle className="w-5 h-5  rounded-full" />
              </button>
            ) : (
              <button onClick={(e) => handleOpen(table.idMesa, e)}>
                <X className="w-5 h-5 bg-black text-white rounded-full" />
              </button>
            )}
          </div>
        ))}
    </>
  )
}
