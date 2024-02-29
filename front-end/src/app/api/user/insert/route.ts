import ApiRoute from '@/data/apiRoute'

export async function POST(request: Request) {
  try {
    const requestBody = request.json()

    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    console.log(data.errors)

    return Response.json(data.message)
  } catch (error) {
    console.log('Erro ao analisar JSON:', error)
  }
}
