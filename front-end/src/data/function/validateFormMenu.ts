export function ValidateFormMenu(
  cpf: string,
  value: string,
  idMesa: number,
  statusOrder: string,
  methodPay: string,
) {
  if (cpf && value && idMesa && statusOrder && methodPay) {
    return ''
  }
  return 'Preencha os dados!'
}
