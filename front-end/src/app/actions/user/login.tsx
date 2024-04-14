'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function LoginUser(requestBody: object) {
  try {
    const cookiesStore = cookies()

    const response = await ApiRoute('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      return { message: 'error' }
    }

    if (data.message === 'E-mail não verificado') {
      return { message: 'E-mail não verificado' }
    }

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })
    if (data.data.r === 'JesusIsKingADM') {
      cookiesStore.set('r', data.data.r, {
        expires: Date.now() + 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    }

    if (data.message === 'erro') {
      return { data: 'Error' }
    }

    return { message: 'sucess' }
  } catch (error) {
    return { message: 'error' }
  }
}
