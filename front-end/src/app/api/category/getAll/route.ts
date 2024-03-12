import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await ApiRoute(`/category`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 10,
      },
    })

    const data = await response.json()

    return NextResponse.json({ data })
  } catch (error) {
    console.error(error)
    throw error
  }
}
