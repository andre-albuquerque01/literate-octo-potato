'use client'
import GetAllTableService from '@/app/actions/table/getAllTable'
import { UpdateTable } from '@/app/actions/table/updateTable'
import { TableInterface } from '@/data/type/table'
import { X, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export const TableStatus = () => {
  const [data, setData] = useState<TableInterface[]>([])
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    const getAl = async () => {
      const dat = await GetAllTableService()
      setData(dat.data)
    }
    getAl()
  }, [])

  useEffect(() => {
    const getAl = async () => {
      const dat = await GetAllTableService()
      setData(dat.data)
    }
    if (status) {
      getAl()
      setStatus(false)
    }
  }, [status])

  const handleBlock = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await UpdateTable({ statusMesa: 1 }, id)
    if (table.message === 'sucess') {
      alert('Mesa torna-se ocupada!')
      setStatus(true)
    }
  }

  const handleOpen = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await UpdateTable({ statusMesa: 0 }, id)
    if (table.message === 'sucess') {
      alert('Mesa torna-se vazia!')
      setStatus(true)
    }
  }

  return (
    <>
      {data.map((table, index) => (
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
