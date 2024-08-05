'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function LogoutUser() {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    })

    cookiesStore.delete('token')
    cookiesStore.delete('r')

    if (!response.ok) return false

    return true
  } catch (error) {
    return false
  }
}
