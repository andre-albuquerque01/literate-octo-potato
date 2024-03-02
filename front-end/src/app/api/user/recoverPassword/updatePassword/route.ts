import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  try {
    const requestBody = await request.json()
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

    const data = await response.json()
    console.log(data)
    cookiesStore.delete('tokenRecover')
    return new Response(JSON.stringify(data), {
      status: response.status,
    })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 405,
    })
  }
}
