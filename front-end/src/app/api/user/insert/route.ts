import ApiRoute from '@/data/apiRoute'

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()

    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    console.log(data)

    return Response.json({ data })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
