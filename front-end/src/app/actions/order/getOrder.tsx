'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetOrderService(id: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/ordersa/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      next: {
        revalidate: 60,
        tags: ['order'],
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
