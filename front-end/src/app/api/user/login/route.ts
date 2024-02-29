import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const reqBody = await request.json()

    const cookiesStore = cookies()
    const xsrf = cookiesStore.get('XSRF-TOKEN')

    const response = await ApiRoute('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrf?.value,
        application: 'application/json',
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    cookiesStore.set('token', data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
    })
    cookiesStore.set('r', data.r, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
    })

    return Response.json(data.message)
  } catch (error) {
    console.error(error)
  }
}
