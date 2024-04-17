export function ValidateFormCategoria(
  typeCategory: string,
  urlImageCategory: string,
) {
  if (typeCategory && urlImageCategory) {
    return ''
  }
  return 'Preencha os dados!'
}
