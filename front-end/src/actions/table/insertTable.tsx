'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'

export async function InsertTable(requestBody: object) {
  try {
    const response = await ApiRoute('/table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(requestBody),
    })
    revalidateTag('table')
    revalidatePathAction('/table')
    const data = await response.json()
    return data
  } catch (error) {
    return 'Houve error'
  }
}
