import ComandaService from '@/app/actions/order/comanda'
import { RemoveItenComanda } from '@/components/removeItemComanda'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Comanda({ params }: { params: { id: number } }) {
  const reqbody = await ComandaService(params.id)
  const dt = await reqbody.json()
  const data = dt.data.data

  let soma = 0
  let mesa = 0
  let date = ''
  let dateUpdated = ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((sm: any) => {
    soma += sm.valueOrder
    mesa = sm.numberMesa
    date = sm.created_at
    if (mesa !== sm.numberMesa) {
      mesa = sm.numberMesa
    }
    if (date !== sm.created_at) {
      date = sm.created_at
    }
    dateUpdated = sm.updated_at
  })

  function formatarData(dataISO: string): string {
    function padLeft(value: number): string {
      return value < 10 ? '0' + value : value.toString()
    }

    if (dataISO) {
      const data = new Date(dataISO)

      const dia = padLeft(data.getDate())
      const mes = padLeft(data.getMonth() + 1)
      const ano = data.getFullYear()
      const hora = padLeft(data.getHours())
      const minuto = padLeft(data.getMinutes())

      return `${hora}:${minuto} - ${dia}/${mes}/${ano}`
    }
    return ''
  }

  return (
    <div className="w-full">
      <div className="max-md:w-[90%] min-h-full max-md:mx-auto md:mt-4">
        <Link href="/menu/list" className="flex items-center py-4 md:hidden">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <h1 className="text-2xl">Comanda</h1>
        <div className="flex flex-wrap max-md:justify-center gap-5 md:mt-4">
          {data &&
            data.map((itens: InterfaceItens, index: number) => (
              <div
                className="flex flex-wrap justify-between gap-3 max-md:w-full shadow-xl p-2 border md:w-[360px] h-[130px] border-zinc-200 rounded-lg"
                key={index}
              >
                <div className="flex gap-3">
                  <Image
                    src={itens.urlImage}
                    alt={`Imagem do ${itens.title}`}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col justify-evenly">
                    <p className="font-medium text-lg text-wrap">
                      {itens.title}
                    </p>
                    <p className="font-medium text-md">
                      {itens.valueOrder.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <RemoveItenComanda id={itens.idOrder} idComanda={params.id} />
              </div>
            ))}
        </div>
        <Link
          href={`/order/addCart/${params.id}`}
          className="flex items-center gap-2 opacity-70 mx-auto w-48 justify-center mt-5 border-b-2 hover:border-red-600"
        >
          <Plus className="w-5 h-5 border border-black rounded-full" />
          <span>Adicionar mais itens.</span>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="border border-zinc-500 max-md:fixed md:mt-5 bottom-0 max-md:z-30 px-4 md:py-5 bg-white max-md:w-full md:mb-5 md:w-[40%] space-y-1 md:rounded-xl">
          <div className="flex justify-between">
            <span className="font-medium">Data</span>
            <span>{formatarData(dateUpdated)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Mesa</span>
            <span>{mesa}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Preço</span>
            <span>
              {soma.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-center">
            <Link
              href={`/menu/update/${params.id}?value=${soma}`}
              className="flex justify-center items-center font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-1 hover:bg-red-500"
            >
              Finalizar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
