'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertCategory(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const typeCategory = request.get('typeCategory') as string | null
  const urlImageCategory = request.get('urlImageCategory') as string | null
  try {
    if (!typeCategory && !urlImageCategory) {
      throw new Error('Preencha os dados!')
    }
    const response = await ApiRoute('/category', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
    })

    const data = await response.json()
    if (data.message === 'The type category field is required.')
      throw new Error('O campo tipo de categoria é obrigatório.')

    if (!response.ok) return { data: null, error: '', ok: false }
    revalidateTag('category')

    return { data: null, error: '', ok: true }
  } catch (error) {
    throw new Error(
      'Desculpe, ocorreu um erro ao cadastrar o categoria. Por favor, tente novamente mais tarde.',
    )
  }
}
