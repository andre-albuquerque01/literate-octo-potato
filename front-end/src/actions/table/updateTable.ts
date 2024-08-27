'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateTable(reqBody: object, id: number) {
  try {
    const response = await ApiRoute(`/table/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })
    const data = await response.json()

    revalidateTag('table')
    return data.data.message
  } catch (error) {
    return 'Error'
  }
}
