export function TranslateErroTable(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The number mesa field is required.':
      'O campo número da mesa é obrigatório.',
    'The lotacao field is required.': 'O campo capacidade é obrigatório.',
    'The number mesa has already been taken.':
      'O número da mesa já está sendo usado',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
