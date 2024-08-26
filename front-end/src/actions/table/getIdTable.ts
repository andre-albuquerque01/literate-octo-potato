'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetIdTableService(id: number) {
  try {
    const response = await ApiRoute(`/table/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      cache: 'no-cache',
    })

    const data = await response.json()

    return data
  } catch (error) {
    return 'Error'
  }
}
