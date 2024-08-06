import ComandaService from '@/actions/order/comanda'
import { RemoveItenComanda } from '@/components/removeItemComanda'
import { FormatData } from '@/data/function/formateData'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { OrderInterface } from '@/data/type/order'
import { ArrowLeft, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Comanda({ params }: { params: { id: number } }) {
  const data = await ComandaService(params.id)

  let soma = 0
  let mesa = 0
  let qtdOrder = 0
  let dateUpdated = ''

  data &&
    data.forEach((sm: OrderInterface) => {
      soma += sm.valueOrder
      mesa = sm.numberMesa
      dateUpdated = sm.updated_at
      qtdOrder += sm.qtdOrder
      if (mesa !== sm.numberMesa) {
        mesa = sm.numberMesa
      }
    })

  return (
    <div className="w-full">
      <div className="max-md:w-[90%] min-h-full max-md:mx-auto md:mt-4">
        <h1 className="text-2xl">Comanda</h1>
        <Link href="/menu/list" className="flex items-center py-4">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <div className="flex flex-wrap max-md:justify-center gap-5 md:mt-4">
          {data &&
            data.map((itens: InterfaceItens, index: number) => (
              <div
                className="flex flex-wrap justify-between gap-3 max-md:w-full shadow-xl p-2 border md:w-[360px] h-[130px] border-zinc-200 rounded-lg"
                key={index}
              >
                <div className="flex gap-3">
                  <Image
                    src={itens.itens.urlImage}
                    alt={`Imagem do ${itens.title}`}
                    width={150}
                    height={150}
                    className="rounded-lg w-[145px] h-[115px]"
                  />
                  <div className="flex flex-col justify-evenly w-[150px]">
                    <p className="font-medium text-lg truncate">
                      {itens.itens.title}
                    </p>
                    <p className="font-medium text-lg text-wrap">
                      Qtd: {itens.qtdOrder}
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
      <div className="flex justify-center max-sm:mt-36">
        <div className="border border-zinc-500 max-md:fixed md:mt-5 bottom-0 max-md:z-30 px-4 md:py-5 bg-white max-md:w-full md:mb-5 md:w-[40%] space-y-1 md:rounded-xl">
          <div className="flex justify-between">
            <span className="font-medium">Data</span>
            <span>{FormatData(dateUpdated)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Mesa</span>
            <span>{mesa}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantidade de itens</span>
            <span>{qtdOrder}</span>
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
