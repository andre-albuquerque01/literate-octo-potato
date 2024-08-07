'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetIdMenuService(id: number) {
  try {
    const response = await ApiRoute(`/menu/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      cache: 'no-cache',
      next: {
        tags: ['menuId'],
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
