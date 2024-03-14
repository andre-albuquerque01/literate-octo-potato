import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { title: number } },
) {
  try {
    const title = params.title

    const response = await ApiRoute(`/itenst/${title}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      // next: {
      //   revalidate: 60,
      // },
    })

    const data = await response.json()
    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
