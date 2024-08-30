'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateCategory(reqBody: object, id: string) {
  try {
    const response = await ApiRoute(`/category/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })
    revalidateTag('category')

    const data = await response.json()
    if (data.message === 'The type category field is required.')
      return 'O tipo de categoria é requerido!'
    if (!response.ok) return data.data.message

    return 'success'
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao cadastrar o categoria. Por favor, tente novamente mais tarde.'
  }
}
