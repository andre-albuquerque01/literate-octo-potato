'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetOrderService(id: string) {
  try {
    const response = await ApiRoute(`/ordersa/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60,
        tags: ['order'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Error'
  }
}
