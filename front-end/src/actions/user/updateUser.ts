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

    let text = ''
    switch (data) {
      case data.data.message === 'incorrect password':
        text = 'A senha inválida'
        break
      case data.data.message === 'success':
        text = 'success'
        break
      default:
        return ''
    }

    if (!response.ok) {
      return 'Erro ao fazer alteração!'
    }

    return text
  } catch (error) {
    return 'Erro ao fazer alteração!'
  }
}
