import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export default async function GET() {
  try {
    const response = await ApiRoute(`/itens`, {
      next: {
        revalidate: 60,
      },
    })

    const data = await response.json()
    console.log(data)

    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
