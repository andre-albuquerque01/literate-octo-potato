import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: number } }) {
  try {
    const id = params.id

    const response = await ApiRoute(`/rate/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
