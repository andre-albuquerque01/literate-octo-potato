'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'
import { revalidateTag } from 'next/cache'

export async function DeleteOrder(id: string, idComanda: string) {
  try {
    const response = await ApiRoute(`/order/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    if (!response.ok) return false
    revalidatePathAction(`/order/comanda/${idComanda}`)
    revalidateTag('order')
    return true
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
