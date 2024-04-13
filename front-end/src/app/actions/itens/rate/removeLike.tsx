'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DeleteLike(id: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/rate/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    })
    revalidateTag('rate')
    revalidateTag('rateU')
    if (!response.ok) return false
    return true
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
