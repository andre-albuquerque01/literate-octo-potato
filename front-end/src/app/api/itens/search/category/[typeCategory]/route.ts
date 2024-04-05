import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { typeCategory: number; page: number } },
) {
  try {
    const typeCategory = params.typeCategory
    const page = params.page

    const response = await ApiRoute(`/itensc/${typeCategory}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
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
