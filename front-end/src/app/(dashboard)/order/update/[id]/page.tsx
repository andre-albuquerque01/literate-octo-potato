'use client'
import { GetIdItens } from '@/actions/itens/getIdItens'
import GetOrderService from '@/actions/order/getOrder'
import { UpdateOrder } from '@/actions/order/updateOrder'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

const BtnForm = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Alterando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Alterar
          </button>
        </div>
      )}
    </>
  )
}

export default function UpdateOrderPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const itens = searchParams.get('iten')
  const menu = searchParams.get('menu')

  const [status, setStatus] = useState<boolean>(false)
  const [data, setData] = useState<InterfaceItens>()
  const [dados, setDados] = useState({
    desconto: '',
    qtdOrder: '',
    tip: '',
    observation: '',
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
      const dt = await GetOrderService(params.id)
      setDados(dt)
    }
    handleData()
    const handleOrder = async () => {
      if (itens && menu) {
        const dt = await GetIdItens(itens)
        setData(dt)
      } else router.back()
    }
    handleOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, itens, menu])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(true)
    if (itens && menu) {
      const req = await UpdateOrder(dados, params.id)
      if (req) {
        alert('Item inserido com sucesso!')
        setStatus(false)
        router.back()
      } else {
        setStatus(false)
        alert('Não foi possível fazer alteração!')
      }
    }
    setStatus(false)
  }
  return (
    <div className="flex flex-col mx-auto justify-center md:h-screen min-h-96 md:mt-[-125px] w-full items-center">
      <Link
        href="/order/menuUser"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-4 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Alteração do pedido
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
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="observation">
            Observação: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="observation"
            id="observation"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <BtnForm pending={status} />
      </form>
    </div>
  )
}
