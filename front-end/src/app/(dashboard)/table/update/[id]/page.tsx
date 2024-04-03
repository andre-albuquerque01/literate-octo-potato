'use client'
import { GetIdTableService } from '@/app/actions/table/getIdTable'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { FormEvent, useEffect, useState } from 'react'

async function putTable(body: object, id: number) {
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

export default function UpdateTable({ params }: { params: { id: number } }) {
  const [returnError, setReturnError] = useState<string>('')
  const [data, setData] = useState({
    lotacao: '',
    numberMesa: '',
    statusMesa: '',
  })

  useEffect(() => {
    const handleId = async (id: number) => {
      const reqbody = await GetIdTableService(id)
      const dt = await reqbody.json()
      const dat = dt.data.data
      setData(dat)
    }
    handleId(params.id)
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const req = await putTable(data, params.id)

    if (req.message === 'sucess') {
      alert('Alterado com sucesso!')
      window.history.back()
    } else if (req.message === 'The number mesa has already been taken.') {
      setReturnError('Número da mesa já cadastrado!')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[80%] w-full items-center">
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Alterar mesa <span className="font-medium">{data.numberMesa}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="numberMesa">
            Número da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="numberMesa"
            id="numberMesa"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.numberMesa ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        {returnError === 'Número da mesa já cadastrado!' && (
          <span className="text-xs text-red-600">
            Número da mesa já cadastrado!
          </span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="lotacao">
            Capacidade da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="lotacao"
            id="lotacao"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.lotacao ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="statusMesa">
            Status inicial da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <select
            name="statusMesa"
            id="statusMesa"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
            value={data?.statusMesa ?? ''}
            onChange={handleChange}
            required
          >
            <option>Selecione o status</option>
            <option value="1">Ativa</option>
            <option value="0">Desativa</option>
          </select>
        </div>
        <BtnForm title="Alterar" />
      </form>
    </div>
  )
}
