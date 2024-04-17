export function ValidateFormTable(numberMesa: string, lotacao: string) {
  if (numberMesa && lotacao) {
    return ''
  }
  return 'Preencha os dados!'
}
