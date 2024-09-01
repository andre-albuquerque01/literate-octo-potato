'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetIdTableService(id: string) {
  try {
    const response = await ApiRoute(`/table/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
    return 'Error'
  }
}
