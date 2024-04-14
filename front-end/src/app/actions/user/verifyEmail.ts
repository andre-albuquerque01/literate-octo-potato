'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function VerifyEmail(email: string) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/verifyEmail/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    })

    if (!response.ok) return false
    return true
  } catch (error) {
    return 'Error'
  }
}
