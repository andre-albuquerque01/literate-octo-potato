/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { InsertMenu } from '@/actions/menu/insertMenu'
import GetAllTableService from '@/actions/table/getAllTable'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import ReactInputMask from 'react-input-mask-next'

const BtnForm = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Cadastrando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Cadastrar
          </button>
        </div>
      )}
    </>
  )
}

export default function InsertOrder() {
  const [state, action] = useFormState(InsertMenu, {
    ok: false,
    error: '',
    data: null,
  })
  const [data, setData] = useState<TableInterface[]>([])
  const router = useRouter()

  useEffect(() => {
    const hanldeData = async () => {
      const dt = await GetAllTableService()
      setData(dt)
    }
    hanldeData()
  }, [])

  useEffect(() => {
    if (state.error === '' && state.ok) {
      alert('Realizado com sucesso.')
      router.back()
    }
  }, [state.ok, state.error])

  return (
    <div className="flex flex-col mx-auto justify-center md:h-screen min-h-96 md:mt-[-125px] w-full items-center">
      <Link
        href="/menu/list"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-4 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Nova comanda</p>
      {state.error && state.error && (
        <span className="text-xs text-red-600 text-wrap max-md:w-80 w-96 text-justify ">
          {state.error}
        </span>
      )}
      <form action={action}>
        <div className="flex flex-col mt-3">
          <label htmlFor="cpf">
            CPF do cliente: <span className="text-red-600">*</span>{' '}
          </label>
          <ReactInputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Informe o número do documento"
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
            placeholder="Informe o valor"
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
            <option value="0">Aberto</option>
            <option value="1">Finalizado</option>
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
        <BtnForm />
      </form>
    </div>
  )
}
