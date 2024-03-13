import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  try {
    const reqBody = await request.json()

    const cookiesStore = cookies()
    const token = cookiesStore.get('token')
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
