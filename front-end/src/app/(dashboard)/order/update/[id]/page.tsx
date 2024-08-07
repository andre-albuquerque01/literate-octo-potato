'use client'
import { GetIdItens } from '@/actions/itens/getIdItens'
import GetOrderService from '@/actions/order/getOrder'
import { UpdateOrder } from '@/actions/order/updateOrder'
import { BtnForm } from '@/components/btnForm'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function UpdateOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const itens = searchParams.get('iten')
  const menu = searchParams.get('menu')

  const [data, setData] = useState<InterfaceItens>()
  const [dados, setDados] = useState({
    desconto: '',
    qtdOrder: '',
    tip: '',
    valueOrder: 0,
    idItens: itens,
    idMenu: menu,
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

  useEffect(() => {
    const calculateValurProduct = () => {
      let total = 0
      let desconto = 0
      for (let i = 0; i < Number(dados.qtdOrder); i++) {
        if (data?.value !== undefined) total += data?.value
      }
      if (dados.desconto) {
        desconto = total * (Number(dados.desconto) / 100)
      }

      if (dados.tip) total += Number(dados.tip)

      if (total - desconto > 0) return total - desconto
      else return 0
    }

    setDados((prevDados) => ({
      ...prevDados,
      valueOrder: calculateValurProduct(),
    }))
  }, [dados, data])

  useEffect(() => {
    const handleData = async () => {
      const reqbody = await GetOrderService(params.id)
      const dat = reqbody.data
      setDados(dat)
    }
    handleData()
    const handleOrder = async () => {
      const reqBody = await GetIdItens(Number(itens))
      const dt = reqBody.data
      setData(dt)
    }
    handleOrder()
  }, [params.id, itens, menu])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (itens && menu) {
      const req = await UpdateOrder(dados, params.id)
      if (req) {
        alert('Item inserido com sucesso!')
        router.back()
      } else {
        alert('Não foi possível fazer alteração!')
      }
    }
  }
  return (
    <div className="flex flex-col mx-auto justify-center h-[80%] w-full items-center">
      <Link
        href="/order/list"
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
          <label htmlFor="desconto">
            Desconto(%): <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="desconto"
            id="desconto"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            value={dados.desconto ?? ''}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="tip">
            Gorjeta: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="tip"
            id="tip"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            value={dados.tip ?? ''}
            onChange={handleChange}
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
