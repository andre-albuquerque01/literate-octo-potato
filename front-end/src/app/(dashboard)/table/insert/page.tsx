'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { FormEvent, useState } from 'react'

async function postTable(body: object) {
  try {
    const request = await Api('/table/insert', {
      method: 'POST',
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

export default function InsertTable() {
  const [returnError, setReturnError] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await postTable(data)

    if (req.message === 'sucess') {
      alert('Cadastrado com sucesso!')
      window.history.back()
    } else if (req.message === 'The number mesa has already been taken.') {
      setReturnError('Número da mesa já cadastrado!')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[80%] w-full items-center">
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro da mesa
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
            required
          >
            <option defaultValue={0}>Selecione o status</option>
            <option value="1">Ativa</option>
            <option value="0">Desativa</option>
          </select>
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
