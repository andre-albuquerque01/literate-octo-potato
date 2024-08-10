import Link from 'next/link'
import { EyeIcon } from 'lucide-react'
import { FormatData } from '@/data/function/formateData'
import { OrderInterface } from '@/data/type/order'

export const MenuListComponent = ({ data }: { data: OrderInterface[] }) => {
  return (
    <div className="space-y-5 mt-4">
      {data !== undefined && data.length > 0 ? (
        data.map((menu, key) => (
          <div key={key} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between gap-4 items-center">
              <span className="">Código: {menu.codigo}</span>
              <span className=" max-md:hidden truncate text-center">
                Data: {FormatData(menu.updated_at)}
              </span>
              <div className="flex justify-end items-center gap-3">
                <Link href={`/order/menu/${menu.idMenu}`} passHref>
                  <span title="Mostra o pedido">
                    <EyeIcon className="w-5 h-5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Nenhuma pedido feito!</h1>
      )}
    </div>
  )
}
