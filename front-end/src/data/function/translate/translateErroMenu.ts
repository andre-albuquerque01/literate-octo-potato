export function TranslateErroMenu(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The cpf field is required.': 'O campo CPF é obrigatório.',
    'The status order field is required.': 'O campo status é obrigatório.',
    'The id mesa field is required.': 'O campo mesa é obrigatório.',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
