'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetIdTableService(id: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/table/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      cache: 'no-cache',
    })

    const data = await response.json()

    return data
  } catch (error) {
    return 'Error'
  }
}
