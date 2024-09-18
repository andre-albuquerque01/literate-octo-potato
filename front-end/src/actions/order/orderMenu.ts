'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function OrderMenu(id: string) {
  try {
    const response = await ApiRoute(`/orderMenu/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 30,
        tags: ['order'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return []
  }
}
