'use server'

import ApiRoute from '@/data/apiRoute'
import VerificationPasswordWithReturn from '@/data/function/validatePasswordWithReturn'
import { ApiErrorResponse } from '@/data/type/errors'

interface UpdatePasswordRequestInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export async function RecoverUpdatePassword(
  requestBody: UpdatePasswordRequestInterface,
) {
  try {
    if (
      !requestBody.token ||
      !requestBody.password ||
      !requestBody.password_confirmation
    ) {
      return 'Preencha os dados!'
    }
    if (requestBody.password !== requestBody.password_confirmation) {
      return 'Senhas incompatíveis!'
    }
    VerificationPasswordWithReturn(requestBody.password)

    const response = await ApiRoute(`/resetPassword`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The password field is required.') {
            return 'O campo senha é obrigatório.'
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
          } else if (message === 'The password field is required.') {
            return 'O campo senha é obrigatório.'
          }
        })
      }
    }

    return ''
  } catch (error) {
    return 'Erro ao fazer alteração!'
  }
}
