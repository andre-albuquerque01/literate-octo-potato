'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

async function insertOrder(body: object) {
  try {
    const request = await Api('/order/insert', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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

async function getItem(id: number): Promise<InterfaceItens> {
  try {
    const request = await Api(`/itens/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function InsertOrder() {
  const [data, setData] = useState<InterfaceItens>()
  const [dados, setDados] = useState({
    qtdOrder: '',
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

  const searchParams = useSearchParams()

  const itens = searchParams.get('iten')
  const menu = searchParams.get('menu')

  function calculateValurProduct() {
    let total = 0
    for (let i = 0; i < Number(dados.qtdOrder); i++) {
      if (data?.value !== undefined) total += data?.value
    }
    return total
  }

  dados.valueOrder = calculateValurProduct()

  useEffect(() => {
    const handleData = async () => {
      const dt = await getItem(Number(itens))
      setData(dt)
    }
    handleData()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (itens && menu) {
      const formData = new FormData(e.currentTarget)
      formData.append('idItens', itens)
      formData.append('idMenu', menu)
      const objet = Object.fromEntries(formData)
      const req = await insertOrder(objet)
      if (req.message === 'sucess') {
        alert('Item inserido com sucesso!')
        window.history.back()
      }
    }
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
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastrado do pedido
      </p>
      <form onSubmit={handleSubmit}>
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
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
