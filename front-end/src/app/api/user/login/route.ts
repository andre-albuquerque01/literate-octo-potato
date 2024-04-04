import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    const cookiesStore = cookies()

    const response = await ApiRoute('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

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
      return false
    }

    return true
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
