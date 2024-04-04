'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function InsertItens(requestBody: object) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/itens', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json()
    if (!response.ok) return NextResponse.json({ data })

    return true
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
