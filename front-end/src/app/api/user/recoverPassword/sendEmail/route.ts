import ApiRoute from '@/data/apiRoute'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    const response = await ApiRoute('/sendTokenRecover', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
    })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
