'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetNameUser() {
  try {
    const response = await ApiRoute('/userName', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 30,
      },
    })

    const data = await response.json()

    return data.data.name
  } catch (error) {
    return 'Error'
  }
}
