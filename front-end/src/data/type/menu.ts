export interface MenuInterface {
  idMesa: string
  codigo: string
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
      observation: string
      itens: {
        idItens: number
        title: string
      }
    },
  ]
}
