import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { page: number } },
) {
  const response = await ApiRoute(`/itensa?page=${params.page}`, {
    next: {
      revalidate: 60,
    },
  })
  const data = await response.json()

  return NextResponse.json({ data })
}
