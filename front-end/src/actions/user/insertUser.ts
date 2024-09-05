'use server'

import ApiRoute from '@/data/apiRoute'
import { ValidateCpf } from '@/data/function/validateCpf'
import VerificationPassword from '@/data/function/validatePassword'
import { ApiErrorResponse } from '@/data/type/errors'
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
    const validateCpf = ValidateCpf(cpf)
    if (!validateCpf) throw new Error('CPF inválido.')

    VerificationPassword(password)

    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The email has already been taken.') {
            throw new Error('E-mail já cadastrado!')
          } else if (message === 'The first name field is required.') {
            throw new Error('O campo primeiro nome é obrigatório.')
          } else if (message === 'The cpf field is required.') {
            throw new Error('O campo cpf é obrigatório.')
          } else if (message === 'The last name field is required.') {
            throw new Error('O campo sobrenome é obrigatório.')
          } else if (message === 'The d d d field is required.') {
            throw new Error('O campo DDD é obrigatório.')
          } else if (message === 'The phone number field is required.') {
            throw new Error('O campo número de telefone é obrigatório.')
          } else if (message === 'The term aceite field is required.') {
            throw new Error('O termo de aceitação é obrigatório.')
          } else if (message === 'The email field is required.') {
            throw new Error('O campo email é obrigatório.')
          } else if (message === 'The password field is required.') {
            throw new Error('O campo senha é obrigatório.')
          } else if (message.startsWith('The phone number field must')) {
            throw new Error('O campo telefone é inválido.')
          } else if (
            message === 'The password confirmation field is required.'
          ) {
            throw new Error('O campo repita senha é obrigatório.')
          } else if (
            message === 'The password field must be at least 8 characters.'
          ) {
            throw new Error('A senha deve ter ao menos 8 caracteres.')
          } else if (
            message === 'The password field must contain at least one symbol.'
          ) {
            throw new Error('A senha precisa de um caracter especial.')
          } else if (
            message ===
            'The password field must contain at least one uppercase and one lowercase letter.'
          ) {
            throw new Error(
              'Senha precisa de ao menos uma letra maiúscula e uma minúsculas.',
            )
          } else if (
            message ===
            'The given password has appeared in a data leak. Please choose a different password.'
          ) {
            throw new Error('Senha fraca.')
          } else if (message === 'The cpf has already been taken.') {
            throw new Error('CPF já usado.')
          }
        })
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Desculpe, ocorreu um erro ao cadastrar. Por favor, tente novamente mais tarde.'

    return {
      data: null,
      error: errorMessage,
      ok: false,
    }
  }
  revalidateTag('user')
  redirect('/user/login')
}
