import ApiRoute from '@/data/apiRoute'

export async function PUT(request: Request) {
  try {
    const requestBody = await request.json()

    const response = await ApiRoute('/sendTokenRecover', {
      method: 'PUT',
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
    console.log('Erro ao analisar JSON:', error)
  }
}
