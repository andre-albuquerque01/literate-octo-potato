'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertOrder(requestBody: object) {
  try {
    const response = await ApiRoute('/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) return false
    revalidateTag('order')
    return true
  } catch (error) {
    return false
  }
}
