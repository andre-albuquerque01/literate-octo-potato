export function TranslateErroOrder(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The qtd order field is required.': 'O campo quantidade é obrigatório.',
    'The value order field is required.': 'O campo valor é obrigatório.',
    'The id menu field is required.': 'O campo menu é obrigatório.',
    'The id itens field is required.': 'O campo id itens é obrigatório.',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
