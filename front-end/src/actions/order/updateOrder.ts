'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateOrder(reqBody: object, id: number) {
  try {
    const response = await ApiRoute(`/order/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()
    revalidateTag('order')
    return data.data
  } catch (error) {
    return 'Error'
  }
}
