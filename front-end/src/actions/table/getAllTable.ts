'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetAllTableService() {
  try {
    const response = await ApiRoute(`/table`, {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60,
        tags: ['table'],
      },
    })

    const data = await response.json()
    return data.data
  } catch (error) {
    return []
  }
}
