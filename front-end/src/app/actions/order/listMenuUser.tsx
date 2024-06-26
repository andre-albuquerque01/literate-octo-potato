'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export default async function ListMenuUserSerive() {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/menuUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
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
