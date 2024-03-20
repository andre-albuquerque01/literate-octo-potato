'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

async function getMesa(): Promise<TableInterface[]> {
  try {
    const request = await Api('/table/getAll', {
      cache: 'no-cache',
      method: 'GET',
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function postMenu(body: object) {
  try {
    const request = await Api('/menu/insert', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const reqBody = await request.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
  }
}

export default function InsertOrder() {
  const [data, setData] = useState<TableInterface[]>([])

  useEffect(() => {
    const hanldeData = async () => {
      const dt = await getMesa()
      setData(dt)
    }
    hanldeData()
  }, [])

  const handleData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await postMenu(data)
    if (req.message === 'sucess') {
      alert('Cadastrado com sucesso!')
      window.history.back()
    } else alert('Não foi feito o cadastrado!')
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[80%] w-full items-center">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Nova comanda</p>
      <form onSubmit={handleData}>
        <div className="flex flex-col mt-3">
          <label htmlFor="cpf">
            CPF do cliente: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="number"
            name="cpf"
            id="cpf"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            name="value"
            id="value"
            step="0.00"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="idMesa">
            Mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <select
            name="idMesa"
            id="idMesa"
            className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
            required
          >
            <option defaultValue={0}>Selecione a mesa</option>
            {data.map((mesa, key) => (
              <option value={mesa.idMesa} key={key}>
                Número: {mesa.numberMesa} && Status:{' '}
                {mesa.statusMesa === 1 ? 'Ocupada' : 'Vazia'}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="statusOrder">
            Status do pedido: <span className="text-red-600">*</span>{' '}
          </label>
          <select
            name="statusOrder"
            id="statusOrder"
            className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
            required
          >
            <option value="">Selecione o status</option>
            <option value="aberto">Aberto</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="methodPay">Metódo de pagamento:</label>
          <select
            name="methodPay"
            id="methodPay"
            className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
          >
            <option value="">Selecione o metodo de pagamento</option>
            <option value="pix">PIX</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cardDebit">Cartão de débito</option>
            <option value="cardCredit">Cartão de crédito</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
