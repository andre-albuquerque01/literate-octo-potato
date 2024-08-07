import HistoricService from '@/actions/order/historic'
import { GetAllMenuComponent } from '@/components/getAllMenu'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function listMenu() {
  const data = await HistoricService()

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Historico
      </p>
      {/* <div className="space-y-5 mt-4">
        {data !== undefined && data.length > 0 ? (
          data.map((menu: MenuInterface, index: number) => (
            <div key={index}>
              <div className="flex mx-auto justify-between">
                <span className="max-w-96">Codigo: {menu.codigo}</span>
                <span className="max-md:hidden truncate w-96 text-center">
                  Data: {FormatData(menu.updated_at)}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/order/menu/${menu.idMenu}`}
                    title="Mostra o pedido"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="w-full h-[1px] bg-zinc-600"></div>
            </div>
          ))
        ) : (
          <h1>Nenhuma pedido feito!</h1>
        )}
      </div> */}
      <GetAllMenuComponent data={data} />
    </div>
  )
}
