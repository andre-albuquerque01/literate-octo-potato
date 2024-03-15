import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/table`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token?.value}`,
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
