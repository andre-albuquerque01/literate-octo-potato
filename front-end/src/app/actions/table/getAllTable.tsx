'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetAllTableService() {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/table`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
