'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function RecoverUpdatePassword(requestBody: object) {
  try {
    const cookiesStore = cookies()
    const tokenRecover = cookiesStore.get('tokenRecover')

    const response = await ApiRoute(`/updatePassword/${tokenRecover?.value}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    cookiesStore.delete('tokenRecover')
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
