'use server'

import ApiRoute from '@/data/apiRoute'
import VerificationPasswordWithReturn from '@/data/function/validatePasswordWithReturn'
import { cookies } from 'next/headers'

export async function UpdatePasswordUser(request: FormData) {
  const password = request.get('password') as string
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null
  try {
    if (password !== passwordConfirmation) {
      return 'Senha incompativel!'
    }
    VerificationPasswordWithReturn(password)

    const response = await ApiRoute('/userPassword', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('The email has already been taken.'))
      return 'E-mail já cadastrado!'
    if (
      message &&
      message.includes('The password field must be at least 8 characters.')
    )
      return 'A senha deve ter ao menos 8 caracters'
    if (
      message &&
      message.includes('The password field must contain at least one symbol.')
    )
      return 'A senha precisa de um caracter especial'
    if (
      message &&
      message.includes(
        'The password field must contain at least one uppercase and one lowercase letter.',
      )
    )
      return 'Senha precisa de ao menos uma letra maiúscula e uma minúsculas'
    if (
      message &&
      message.includes(
        'The given password has appeared in a data leak. Please choose a different password.',
      )
    )
      return 'Senha fraca.'

    return 'success'
  } catch (error) {
    return 'Houver error'
  }
}
