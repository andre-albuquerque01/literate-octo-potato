'use client'
import GetIdMenuService from '@/actions/menu/getIdMenu'
import { UpdateMenu } from '@/actions/menu/updateMenu'
import GetAllTableService from '@/actions/table/getAllTable'
import Loading from '@/app/loading'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import ReactInputMask from 'react-input-mask-next'

const BtnForm = ({ pending }: { pending: boolean }) => {
  return (
    <div className="flex justify-center">
      <button
        className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
        disabled={pending}
      >
        {pending ? 'Alterando...' : 'Alterar'}
      </button>
    </div>
  )
}

export default function UpdateOrder({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<boolean>(false)
  const [returnError, setReturnError] = useState<string>('')
  const [table, setTable] = useState<TableInterface[]>([])
  const router = useRouter()
  const [data, setData] = useState({
    idMesa: '',
    cpf: '',
    statusOrder: '',
    methodPay: '',
    value: 0,
    tip: '',
    desconto: '',
  })

  const searchParams = useSearchParams()
  const valor = searchParams.get('value')

  function calculateValurProduct() {
    if (valor) {
      let total = Number(valor)
      if (data.desconto && Number(data.desconto) <= 100) {
        total -= Number(total) * (Number(data.desconto) / 100)
      }
      if (data.tip) {
        total += Number(data.tip)
      }

      return total
    }
    return 0
  }

  useEffect(() => {
    const handleMesa = async () => {
      const dt = await GetAllTableService()
      setTable(dt)
    }

    const hanldeData = async (id: string) => {
      const dt = await GetIdMenuService(id)
      setData(dt)
    }

    handleMesa()
    hanldeData(params.id)
  }, [params.id])

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      value: calculateValurProduct(),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.desconto, data.tip])

  const handleData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const dt = Object.fromEntries(formData)
    const req = await UpdateMenu(dt, params.id)
    if (req === 'success') {
      setStatus(false)
      alert('Alteração feita com sucesso.')
      router.push('/menu/list')
    } else {
      setStatus(false)
      setReturnError(req)
    }
    setStatus(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col mx-auto justify-center md:h-screen md:mt-[-125px] w-full items-center">
      <Suspense fallback={<Loading />}>
        <>
          <Link
            href="/menu/list"
            className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-4 max-md:w-80"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
            Alterar pedido
          </p>
          <form onSubmit={handleData}>
            <div className="flex flex-col mt-3">
              <label htmlFor="cpf">
                CPF do cliente: <span className="text-red-600">*</span>{' '}
              </label>
              <ReactInputMask
                mask="999.999.999-99"
                name="cpf"
                id="cpf"
                className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                value={data.cpf ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="value">
                Valor: <span className="text-red-600">*</span>{' '}
              </label>
              <input
                type="number"
                name="value"
                id="value"
                className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 bg-zinc-300"
                value={data.value}
                onChange={handleChange}
                readOnly
                required
              />
            </div>
            <div className="flex flex-col mt-3 max-md:mt-3">
              <label htmlFor="desconto">Desconto(%):</label>
              <input
                type="number"
                name="desconto"
                id="desconto"
                min={0}
                step="0.01"
                className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                value={data.desconto ?? ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-3 max-md:mt-3">
              <label htmlFor="tip">Gorjeta: (R$)</label>
              <input
                type="number"
                name="tip"
                id="tip"
                min={0}
                step="0.01"
                className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                value={data.tip ?? ''}
                onChange={handleChange}
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
                value={data.idMesa}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a mesa</option>
                {table.map((mesa, key) => (
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
                value={data.statusOrder}
                onChange={handleChange}
                required
              >
                <option value="1">Finalizado</option>
              </select>
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="methodPay">
                Forma de pagamento: <span className="text-red-600">*</span>{' '}
              </label>
              <select
                name="methodPay"
                id="methodPay"
                className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
                value={data.methodPay}
                onChange={handleChange}
                required
              >
                <option>Forma de pagamento</option>
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="pix">Pix</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="outro">Outros</option>
              </select>
            </div>
            {returnError && (
              <p className="text-red-600 w-96 max-md:w-80">{returnError}</p>
            )}
            <BtnForm pending={status} />
          </form>
        </>
      </Suspense>
    </div>
  )
}
