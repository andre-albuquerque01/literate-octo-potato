'use server'

import ApiRoute from '@/data/apiRoute'
import VerificationPasswordWithReturn from '@/data/function/validatePasswordWithReturn'
import { ApiErrorResponse } from '@/data/type/errors'
import { cookies } from 'next/headers'

export async function UpdatePasswordUser(request: FormData) {
  const password = request.get('password') as string
  const passwordNew = request.get('password_new') as string
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null
  try {
    if (!password || passwordNew || passwordConfirmation) {
      return 'Preenchas os dados!'
    }
    if (passwordNew !== passwordConfirmation) {
      return 'Senha incompativel!'
    }
    VerificationPasswordWithReturn(passwordNew)

    const reqBody = Object.fromEntries(request)
    const response = await ApiRoute('/userPassword', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data: ApiErrorResponse = await response.json()
    console.log(data)

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

    return 'success'
  } catch (error) {
    return 'Houver error'
  }
}
