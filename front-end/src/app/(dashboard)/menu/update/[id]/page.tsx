'use client'
import GetIdMenuService from '@/app/actions/menu/getIdMenu'
import { UpdateMenu } from '@/app/actions/menu/updateMenu'
import GetAllTableService from '@/app/actions/table/getAllTable'
import { BtnForm } from '@/components/btnForm'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

export default function UpdateOrder({ params }: { params: { id: number } }) {
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

  data.value = calculateValurProduct()

  useEffect(() => {
    const handleMesa = async () => {
      const reqbody = await GetAllTableService()
      const dat = reqbody.data
      setTable(dat)
    }

    const hanldeData = async (id: number) => {
      const reqbody = await GetIdMenuService(id)
      const dat = reqbody.data
      setData(dat)
    }

    handleMesa()
    hanldeData(params.id)
  }, [params.id])

  const handleData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const req = await UpdateMenu(data, params.id)
    if (req) {
      alert('Alteração feita com sucesso!')
      router.back()
    } else alert('Não foi feita alteração!')
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
    <div className="flex flex-col mx-auto justify-center h-[800px] w-full items-center">
      <Suspense fallback={'Carregando...'}>
        {data?.idMesa !== undefined ? (
          <>
            <Link
              href="/menu/list"
              className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
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
                <input
                  type="number"
                  name="cpf"
                  id="cpf"
                  className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                  defaultValue={data.cpf ?? ''}
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
                  step="0.00"
                  className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 bg-zinc-300"
                  defaultValue={data.value ?? ''}
                  onChange={handleChange}
                  disabled
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
                  value={data.desconto ?? ''}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mt-3 max-md:mt-3">
                <label htmlFor="tip">
                  Gorjeta: (R$)<span className="text-red-600">*</span>{' '}
                </label>
                <input
                  type="text"
                  name="tip"
                  id="tip"
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
                  <option defaultValue={0}>Selecione a mesa</option>
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
                  <option value="">Selecione o status</option>
                  <option value="aberto">Aberto</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>

              <div className="flex flex-col mt-3">
                <label htmlFor="methodPay">
                  Metódo de pagamento: <span className="text-red-600">*</span>{' '}
                </label>
                <select
                  name="methodPay"
                  id="methodPay"
                  className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
                  value={data.methodPay}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o metodo de pagamento</option>
                  <option value="pix">PIX</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cardDebit">Cartão de débito</option>
                  <option value="cardCredit">Cartão de crédito</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <BtnForm title="Alterar" />
            </form>
          </>
        ) : (
          <h1>Ordem não encontrado!</h1>
        )}
      </Suspense>
    </div>
  )
}
