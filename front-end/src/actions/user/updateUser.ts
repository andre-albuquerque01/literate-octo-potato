'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/errors'
import { cookies } from 'next/headers'

export async function UpdateUser(request: FormData) {
  const firstName = request.get('firstName') as string | null
  const lastName = request.get('lastName') as string | null
  const phoneNumber = request.get('phoneNumber') as string | null
  const ddd = request.get('DDD') as string | null
  const password = request.get('password') as string | null

  try {
    if (!firstName || !lastName || !phoneNumber || !ddd || !password) {
      return 'Preenchas os dados!'
    }
    const reqBody = Object.fromEntries(request)

    const response = await ApiRoute('/userUpdate', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The email has already been taken.') {
            return 'E-mail já cadastrado!'
          } else if (message === 'The first name field is required.') {
            return 'O campo primeiro nome é obrigatório.'
          } else if (message === 'The cpf field is required.') {
            return 'O campo cpf é obrigatório.'
          } else if (message === 'The last name field is required.') {
            return 'O campo sobrenome é obrigatório.'
          } else if (message === 'The d d d field is required.') {
            return 'O campo DDD é obrigatório.'
          } else if (message === 'The phone number field is required.') {
            return 'O campo número de telefone é obrigatório.'
          } else if (message === 'The term aceite field is required.') {
            return 'O termo de aceitação é obrigatório.'
          } else if (message === 'The email field is required.') {
            return 'O campo email é obrigatório.'
          } else if (message === 'The password field is required.') {
            return 'O campo senha é obrigatório.'
          } else if (message.startsWith('The phone number field must')) {
            return 'O campo telefone é inválido.'
          } else if (
            message === 'The password confirmation field is required.'
          ) {
            return 'O campo repita senha é obrigatório.'
          } else if (
            message === 'The password field must be at least 8 characters.'
          ) {
            return 'A senha deve ter ao menos 8 caracteres.'
          } else if (
            message === 'The password field must contain at least one symbol.'
          ) {
            return 'A senha precisa de um caracter especial.'
          } else if (
            message ===
            'The password field must contain at least one uppercase and one lowercase letter.'
          ) {
            return 'Senha precisa de ao menos uma letra maiúscula e uma minúsculas.'
          } else if (
            message ===
            'The given password has appeared in a data leak. Please choose a different password.'
          ) {
            return 'Senha fraca.'
          } else if (message === 'The cpf has already been taken.') {
            return 'CPF já usado.'
          } else if (message === 'The password field is required.') {
            return 'O campo senha é obrigatório.'
          }
        })
      }
    }

    if (!response.ok) {
      return 'Desculpe, ocorreu um erro ao alterar. Por favor, tente novamente mais tarde.'
    }

    return ''
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar. Por favor, tente novamente mais tarde.'
  }
}
