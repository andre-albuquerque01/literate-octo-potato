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
    console.log(data)
    cookiesStore.set('tokenRecuperacao', data.token, {
      expires: Date.now() + 2 * 60 * 60,
      secure: true,
    })
    return Response.json({ data })
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
