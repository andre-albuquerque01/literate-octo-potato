import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export default async function GET({ params }: { params: { page: string } }) {
  try {
    const page = params.page

    const response = await ApiRoute(`/itens?page=${page}`, {
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
