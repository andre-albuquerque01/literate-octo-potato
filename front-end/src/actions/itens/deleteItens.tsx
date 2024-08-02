'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'
import { revalidateTag } from 'next/cache'

export async function DeleteItens(id: number) {
  try {
    const response = await ApiRoute(`/itens/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    if (!response.ok) return false
    revalidateTag('itens')
    revalidatePathAction('/itens/list')
    return true
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
