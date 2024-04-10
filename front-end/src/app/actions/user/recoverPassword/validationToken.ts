'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function ValidationToken(requestBody: object) {
  try {
    const cookiesStore = cookies()

    const response = await ApiRoute('/verifyTokenRecover', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    cookiesStore.set('tokenRecover', data.token, {
      expires: Date.now() + 60 * 10 * 1000,
      secure: true,
      httpOnly: true,
    })

    return data
  } catch (error) {
    return 'Houve error'
  }
}
