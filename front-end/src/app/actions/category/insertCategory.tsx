'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertCategory(requestBody: object) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/category', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    })
    revalidateTag('category')
    const data = await response.json()
    if (!response.ok) return Response.json({ data })

    return true
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
