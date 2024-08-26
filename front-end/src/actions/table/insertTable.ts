'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'
import ApiError from '@/data/function/apiErro'

export async function InsertTable(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const numberMesa = request.get('numberMesa') as string | null
  const lotacao = request.get('lotacao') as string | null

  try {
    if (!numberMesa || !lotacao) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiRoute('/table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
    })

    const data = await response.json()
    if (data.data.message === 'The number mesa has already been taken.')
      throw new Error('Número da mesa já cadastrado!')

    revalidateTag('table')
    revalidatePathAction('/table')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return ApiError(error)
  }
}
