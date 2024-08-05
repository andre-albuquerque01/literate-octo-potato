'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetAllMenuService() {
  try {
    const response = await ApiRoute(`/menuAll`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60,
        tags: ['menu'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
