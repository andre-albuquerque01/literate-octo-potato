import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()
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

    return new Response(JSON.stringify(data), {
      status: response.status,
    })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
