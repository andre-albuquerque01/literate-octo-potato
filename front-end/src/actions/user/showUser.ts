'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function ShowUser() {
  try {
    const response = await ApiRoute('/userShow', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        tags: ['user'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Error'
  }
}
