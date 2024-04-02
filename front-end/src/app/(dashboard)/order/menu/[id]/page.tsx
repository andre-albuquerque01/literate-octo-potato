import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function getId(id: number): Promise<InterfaceItens[]> {
  try {
    const request = await Api(`/order/menu/${id}`, { cache: 'no-cache' })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function Comanda({ params }: { params: { id: number } }) {
  const data = await getId(params.id)

  let soma = 0
  let mesa = 0
  let date = ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((sm: any) => {
    soma += sm.valueOrder
    mesa = sm.numberMesa
    date = sm.updated_at
    if (mesa !== sm.numberMesa) {
      mesa = sm.numberMesa
    }
    if (date !== sm.updated_at) {
      date = sm.updated_at
    }
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
        <Link href="" className="flex items-center py-4 md:hidden">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <h1 className="text-2xl">Comanda</h1>
        <div className="flex flex-wrap max-md:justify-center gap-4 md:mt-4">
          {data.length > 0 ? (
            data.map((itens, index) => (
              <div
                className="flex justify-between gap-3 max-md:w-full shadow-xl p-2 border md:w-[375px] border-zinc-200 rounded-lg"
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
              </div>
            ))
          ) : (
            <h1>Não há itens ainda!</h1>
          )}
        </div>
      </div>
      {data.length > 0 && (
        <div className="flex justify-center">
          <div className="border border-zinc-500 max-md:fixed md:mt-5 bottom-0 max-md:z-30 px-4 md:py-5 bg-white max-md:w-full md:mb-5 md:w-[40%] space-y-1 md:rounded-xl">
            <div className="flex justify-between">
              <span className="font-medium">Data</span>
              <span>{formatarData(date)}</span>
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
          </div>
        </div>
      )}
    </div>
  )
}
