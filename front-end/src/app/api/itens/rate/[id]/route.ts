import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const response = await ApiRoute(`/rate/${id}`, {
      cache: 'no-cache',
    })

    const data = await response.json()

    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
