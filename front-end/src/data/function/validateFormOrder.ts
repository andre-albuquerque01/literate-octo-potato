export function ValidateFormOrder(qtdOrder: string, valueOrder: string) {
  if (qtdOrder && valueOrder) {
    return ''
  }
  return 'Preencha os dados!'
}
