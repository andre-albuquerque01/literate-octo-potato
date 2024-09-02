'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function UpdateUser(reqBody: FormData) {
  try {
    const response = await ApiRoute('/userUpdate', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: reqBody,
    })

    const data = await response.json()

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('The email has already been taken.'))
      return 'E-mail já cadastrado!'
    if (message && message.includes('The cpf has already been taken.'))
      return 'CPF já usado.'

    let text = ''
    switch (data) {
      case data.data.message === 'incorrect password':
        text = 'A senha inválida'
        break
      case data.data.message === 'success':
        text = 'success'
        break
      case data.data.message === 'The cpf has already been taken.':
        text = 'CPF já usado.'
        break
      case data.data.message === 'The email has already been taken.':
        text = 'E-mail já cadastrado!'
        break
      default:
        return ''
    }

    if (!response.ok) {
      return 'Desculpe, ocorreu um erro ao alterar. Por favor, tente novamente mais tarde.'
    }

    return text
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar. Por favor, tente novamente mais tarde.'
  }
}
