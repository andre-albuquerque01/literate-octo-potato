'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'

export async function DeleteOrder(id: number, idComanda: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/order/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      cache: 'no-cache',
    })
    revalidatePathAction(`/order/comanda/${idComanda}`)

    if (!response.ok) return false
    return true
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
