export function ValidateFormTable(numberMesa: string, lotacao: string) {
  if (numberMesa && lotacao) {
    return ''
  }
  throw new Error('Preencha os dados!')
}
