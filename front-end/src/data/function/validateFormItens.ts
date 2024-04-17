export function ValidateFormItens(
  desc: string,
  value: number,
  qtdIten: number,
  urlImage: string,
  waitTime: string,
  idCategory: number,
  position: string,
) {
  if (
    desc &&
    value &&
    qtdIten &&
    urlImage &&
    waitTime &&
    idCategory &&
    position
  ) {
    return ''
  }
  return 'Preencha os dados!'
}
