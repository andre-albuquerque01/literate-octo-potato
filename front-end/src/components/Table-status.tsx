'use client'
import Api from '@/data/api'
import { TableInterface } from '@/data/type/table'
import { X, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

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

async function putStatusTable(body: object, id: number) {
  try {
    const request = await Api(`/table/update/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const reqBody = await request.json()

    return reqBody.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const TableStatus = () => {
  const [data, setData] = useState<TableInterface[]>([])
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    const getAl = async () => {
      const get = await getAll()
      setData(get)
    }
    getAl()
  }, [])

  useEffect(() => {
    const getAl = async () => {
      const getA = await getAll()
      setData(getA)
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
    const table = await putStatusTable({ statusMesa: 1 }, id)
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
    const table = await putStatusTable({ statusMesa: 0 }, id)
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
