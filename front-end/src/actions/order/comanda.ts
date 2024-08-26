'use server'
import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function ComandaService(id: number) {
  try {
    const response = await ApiRoute(`/ordersa/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      cache: 'no-cache',
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Houve erro'
  }
}
