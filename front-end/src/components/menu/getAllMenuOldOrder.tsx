import { FormatData } from '@/data/function/formateData'
import { MenuInterface } from '@/data/type/menu'
import { EyeIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export const GetAllMenuOldOrderComponent = ({
  data,
}: {
  data: MenuInterface[]
}) => {
  const r = cookies().get('r')?.value
  return (
    <div className="space-y-5 mt-4">
      {data !== undefined && data.length > 0 ? (
        data.map((menu, key) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
              <span className="block font-bold">Código: </span> {menu.codigo}
            </div>
            <div className="mb-2">
              <span className="block font-bold">Mesa: </span> {menu.numberMesa}
            </div>
            <div className="mb-2">
              <span className="block font-bold">CPF Cliente: </span> {menu.cpf}
            </div>
            <div className="mb-2">
              <span className="block font-bold">Status: </span>{' '}
              <span className="capitalize">
                {menu.statusOrder === '0' ? 'Aberto' : 'Fechado'}
              </span>
            </div>
            {menu.methodPay && (
              <div className="mb-2">
                <span className="block font-bold">Método de Pagamento: </span>{' '}
                {menu.methodPay}
              </div>
            )}
            {menu.value && (
              <div className="mb-2">
                <span className="block font-bold">Valor: </span> {menu.value}
              </div>
            )}
            <div className="mb-2">
              <span className="block font-bold">Última Atualização: </span>{' '}
              {FormatData(menu.updated_at)}
            </div>
            <div className="mb-2">
              <span className="block font-bold">Pedidos:</span>
              <ul className="list-disc list-inside pl-4">
                {menu.orders.map((order, index) => (
                  <React.Fragment key={index}>
                    <li className="flex max-md:flex-col justify-between max-md:py-4 py-1">
                      <span>
                        Pedido #{order.idOrder} - Quantidade: {order.qtdOrder} -
                        Valor: {order.valueOrder}
                      </span>
                      <span>Item: {order.itens.title}</span>
                    </li>
                    {order.observation && (
                      <li>
                        <span>Observação: {order.observation}</span>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            {r === 'JesusIsKingADM' && (
              <div className="flex items-center gap-3 mt-4">
                <Link
                  href={`/order/oldOrder/${menu.idMenu}`}
                  title="Mostrar o pedido"
                >
                  <EyeIcon className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        ))
      ) : (
        <h1>Nenhuma pedido foi feito!</h1>
      )}
    </div>
  )
}
