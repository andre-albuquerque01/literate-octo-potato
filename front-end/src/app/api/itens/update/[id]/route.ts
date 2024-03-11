import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: number } },
) {
  try {
    const id = params.id
    const reqBody = await request.json()

    const response = await ApiRoute(`/itens/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
