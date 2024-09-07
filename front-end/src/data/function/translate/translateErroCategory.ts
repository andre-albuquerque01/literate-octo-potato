export function TranslateErroCategory(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The type category field is required.':
      'O campo nome da categoria é obrigatório.',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
