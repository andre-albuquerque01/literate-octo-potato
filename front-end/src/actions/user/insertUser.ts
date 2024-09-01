'use server'

import ApiRoute from '@/data/apiRoute'
import ApiError from '@/data/function/apiErro'
import VerificationPassword from '@/data/function/validatePassword'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function InsertUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const firstName = request.get('firstName') as string | null
  const lastName = request.get('lastName') as string | null
  const phoneNumber = request.get('phoneNumber') as string | null
  const email = request.get('email') as string | null
  const cpf = request.get('cpf') as string | null
  const password = request.get('password') as string | null
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null
  const termAceite = request.get('term_aceite') === 'on' ? 1 : 0
  request.set('term_aceite', String(termAceite))

  try {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !cpf ||
      !passwordConfirmation ||
      !termAceite
    ) {
      throw new Error('Preenchas os dados!')
    }
    if (password !== passwordConfirmation) {
      throw new Error('Senha incompativel!')
    }
    VerificationPassword(password)

    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()
    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('The email has already been taken.'))
      throw new Error('E-mail já cadastrado!')

    if (message && message.includes('The first name field is required.'))
      throw new Error('O campo primeiro nome é obrigatório.')
    if (message && message.includes('The cpf field is required.'))
      throw new Error('O campo cpf é obrigatório.')

    if (message && message.includes('The last name field is required.'))
      throw new Error('O campo sobrenome é obrigatório.')

    if (message && message.includes('The d d d field is required.'))
      throw new Error('O campo DDD é obrigatório.')

    if (message && message.includes('The phone number field is required.'))
      throw new Error('O campo número de telefone é obrigatório.')

    if (message && message.includes('The term aceite field is required.'))
      throw new Error('O termo de aceitação é obrigatório.')

    if (message && message.includes('The email field is required.'))
      throw new Error('O campo email é obrigatório.')

    if (message && message.includes('The password field is required.'))
      throw new Error('O campo senha é obrigatório.')

    if (
      message &&
      message.includes('The password confirmation field is required.')
    )
      throw new Error('O campo repita senha é obrigatório.')
    if (
      message &&
      message.includes('The password field must be at least 8 characters.')
    )
      throw new Error('A senha deve ter ao menos 8 caracters')
    if (
      message &&
      message.includes('The password field must contain at least one symbol.')
    )
      throw new Error('A senha precisa de um caracter especial')
    if (
      message &&
      message.includes(
        'The password field must contain at least one uppercase and one lowercase letter.',
      )
    )
      throw new Error(
        'Senha precisa de ao menos uma letra maiúscula e uma minúsculas',
      )
    if (
      message &&
      message.includes(
        'The given password has appeared in a data leak. Please choose a different password.',
      )
    )
      throw new Error('Senha fraca.')
    if (message && message.includes('The cpf has already been taken.'))
      throw new Error('CPF já usado.')
  } catch (error) {
    return ApiError(error)
  }
  revalidateTag('user')
  redirect('/user/login')
}
