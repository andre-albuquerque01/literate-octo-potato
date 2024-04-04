'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function UpdateMenu(reqBody: object, id: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/menu/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    if (!response.ok) return false

    return true
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
