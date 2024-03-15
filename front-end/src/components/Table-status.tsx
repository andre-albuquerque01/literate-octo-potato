'use client'
import Api from '@/data/api'
import { X, CheckCircle } from 'lucide-react'

interface Table {
  numberTable: string
  lotacao: string
  statusMesa: number
  idMesa: number
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

export const TableStatus = (props: Table) => {
  const handleBlock = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await putStatusTable({ statusMesa: 1 }, props.idMesa)
    if (table.message === 'sucess') {
      alert('Mesa torna-se ocupada!')
      window.location.reload()
    }
  }

  const handleOpen = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    const table = await putStatusTable({ statusMesa: 0 }, props.idMesa)
    if (table.message === 'sucess') {
      alert('Mesa torna-se vazia!')
      window.location.reload()
    }
  }

  return (
    <div className="md:w-[20%] flex justify-between items-center border border-zinc-400 p-4 shadow-md">
      <div className="">
        <p>Mesa {props.numberTable}</p>
        <p className="">{props.statusMesa === 0 ? 'Vazia' : 'Ocupada'}</p>
      </div>
      {props.statusMesa === 0 ? (
        <button onClick={handleBlock}>
          <CheckCircle className="w-5 h-5  rounded-full" />
        </button>
      ) : (
        <button onClick={handleOpen}>
          <X className="w-5 h-5 bg-black text-white rounded-full" />
        </button>
      )}
    </div>
  )
}
