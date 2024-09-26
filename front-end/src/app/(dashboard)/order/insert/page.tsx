/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { GetIdItens } from '@/actions/itens/getIdItens'
import { InsertOrder } from '@/actions/order/insertOrder'
import { BtnForm } from '@/components/buttons/btnForm'
import { GoBack } from '@/components/nav/goBack'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function FormBtn() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Adicionando...
          </button>
        </div>
      ) : (
        <BtnForm title="Adicionar" />
      )}
    </>
  )
}

export default function InsertOrderPage() {
  const [state, action] = useFormState(InsertOrder, {
    ok: false,
    error: '',
    data: null,
  })

  const searchParams = useSearchParams()
  const itens = searchParams.get('iten')
  const menu = searchParams.get('menu')

  const router = useRouter()
  const [data, setData] = useState<InterfaceItens>()

  const [dados, setDados] = useState({
    qtdOrder: '',
    observation: '',
    valueOrder: 0,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setDados((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function calculateValurProduct() {
    let total = 0
    for (let i = 0; i < Number(dados.qtdOrder); i++) {
      if (data?.value !== undefined) total += data?.value
    }
    return total
  }

  dados.valueOrder = calculateValurProduct()

  useEffect(() => {
    if (itens === null || menu === null) router.back()
  }, [itens, menu])

  useEffect(() => {
    const handleData = async () => {
      if (itens && menu) {
        const dt = await GetIdItens(itens)
        setData(dt)
      }
    }
    handleData()
  }, [])

  useEffect(() => {
    if (state && state.ok) {
      alert('Realizado com sucesso.')
      router.back()
    }
  }, [state])

  return (
    <div className="flex flex-col mx-auto justify-center md:h-screen min-h-96 md:mt-[-125px] w-full items-center">
      <GoBack />
      <p className="text-xl mb-1 w-96 max-md:mb-0 mt-4 max-md:w-80">
        Cadastrado do pedido
      </p>
      <form action={action}>
        <input type="hidden" name="idItens" defaultValue={itens ?? ''} />
        <input type="hidden" name="idMenu" defaultValue={menu ?? ''} />
        {state.error && state.error && (
          <span className="text-xs text-red-600">{state.error}</span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label>Item:</label>
          <input
            readOnly
            defaultValue={data?.title}
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 bg-zinc-200 outline-none"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label>Preço do item:</label>
          <input
            readOnly
            defaultValue={data?.value}
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 bg-zinc-200 outline-none"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="qtdOrder">
            Quantidade de itens: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="qtdOrder"
            id="qtdOrder"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            value={dados.qtdOrder ?? ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="valueOrder">
            Valor do pedido: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="valueOrder"
            id="valueOrder"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 bg-zinc-200 outline-none"
            value={dados.valueOrder ?? ''}
            readOnly
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="observation">Observação:</label>
          <input
            type="text"
            name="observation"
            id="observation"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={dados.observation ?? ''}
          />
        </div>
        <FormBtn />
      </form>
    </div>
  )
}
