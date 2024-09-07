export function TranslateErroItens(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The title field is required.': 'O campo título é obrigatório.',
    'The description field is required.': 'O campo descrição é obrigatório.',
    'The value field is required.': 'O campo valor é obrigatório.',
    'The qtd iten field is required.':
      'O campo quantidade de itens é obrigatório.',
    'The url image field is required.': 'O campo URL da imagem é obrigatório.',
    'The wait time field is required.':
      'O campo tempo de espera é obrigatório.',
    'The position field is required.': 'O campo posição é obrigatório.',
    'The id category field is required.': 'O campo categoria é obrigatório.',
    'The value field must be at least 1 characters.':
      'O campo valor dever ter no mínimo 1 digítos.',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
