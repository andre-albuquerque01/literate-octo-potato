import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function POST() {
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

    const data = await response.json()

    cookiesStore.delete('token')
    if (data.data.r === 'JesusIsKingADM') {
      cookiesStore.delete('r')
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
    })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
