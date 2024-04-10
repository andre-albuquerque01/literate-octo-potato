'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function UpdateFunction(reqBody: object) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/userFunction', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    return data
  } catch (error) {
    return 'Houver error'
  }
}
