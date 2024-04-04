'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function InsertMenu(requestBody: object) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/menu', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) return false

    return true
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
