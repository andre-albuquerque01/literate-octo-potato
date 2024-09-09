export function TranslateErroUser(mensagemIngles: string): string {
  const traducaoErros: { [key: string]: string } = {
    'The email has already been taken.': 'E-mail já cadastrado!',
    'The first name field is required.': 'O campo primeiro nome é obrigatório.',
    'The cpf field is required.': 'O campo cpf é obrigatório.',
    'The last name field is required.': 'O campo sobrenome é obrigatório.',
    'The d d d field is required.': 'O campo DDD é obrigatório.',
    'The phone number field is required.':
      'O campo número de telefone é obrigatório.',
    'The term aceite field is required.': 'O termo de aceitação é obrigatório.',
    'The email field is required.': 'O campo email é obrigatório.',
    'The password field is required.': 'O campo senha é obrigatório.',
    'The phone number field must': 'O campo telefone é inválido.',
    'The password confirmation field is required.':
      'O campo repita senha é obrigatório.',
    'The password field must be at least 8 characters.':
      'A senha deve ter ao menos 8 caracteres.',
    'The password field must contain at least one symbol.':
      'A senha precisa de um caracter especial.',
    'The password field must contain at least one uppercase and one lowercase letter.':
      'Senha precisa de ao menos uma letra maiúscula e uma minúsculas.',
    'The given password has appeared in a data leak. Please choose a different password.':
      'Senha fraca.',
    'The cpf has already been taken.': 'CPF já usado.',
  }

  return traducaoErros[mensagemIngles] || mensagemIngles
}
