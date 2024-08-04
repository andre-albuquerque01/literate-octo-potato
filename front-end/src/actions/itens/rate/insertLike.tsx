'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertLike(requestBody: object) {
  try {
    const response = await ApiRoute('/rate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()

    revalidateTag('rateU')
    revalidateTag('rate')
    return data
  } catch (error) {
    return 'Houve error'
  }
}
