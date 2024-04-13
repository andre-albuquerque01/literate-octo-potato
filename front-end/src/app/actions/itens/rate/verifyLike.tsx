'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function VerifyLike(id: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/rateU/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      next: {
        revalidate: 60 * 30,
        tags: ['rateU'],
      },
    })

    const data = await response.json()

    if (data.data !== 'false') return true
    return false
  } catch (error) {
    return false
  }
}
