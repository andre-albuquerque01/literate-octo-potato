import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export default async function GET({ params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const response = await ApiRoute(`/itenss/${slug}`, {
      next: {
        revalidate: 60,
      },
    })

    const data = await response.json()

    return NextResponse.json({ data })
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
