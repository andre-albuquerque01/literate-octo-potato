export interface MenuInterface {
  codigo: string
  idMesa: number
  idMenu: number
  numberMesa: number
  cpf: number
  statusOrder: string
  methodPay: string
  value: string
  updated_at: string
  orders: [
    {
      idOrder: number
      qtdOrder: number
      valueOrder: number
      itens: {
        idItens: number
        title: string
      }
    },
  ]
}
