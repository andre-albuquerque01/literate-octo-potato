'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function ShowUser() {
  try {
    const response = await ApiRoute('/userShow', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        tags: ['user'],
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
