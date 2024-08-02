'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function UpdateCategory(reqBody: object, id: number) {
  try {
    const response = await ApiRoute(`/category/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })
    revalidateTag('category')

    const data = await response.json()
    if (!response.ok) return NextResponse.json({ data })

    return true
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
