'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertLike(requestBody: object) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/rate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    })
    revalidateTag('rate')
    revalidateTag('rateU')
    const data = await response.json()

    return data
  } catch (error) {
    return 'Houve error'
  }
}
