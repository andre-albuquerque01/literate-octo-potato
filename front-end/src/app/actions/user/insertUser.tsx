'use server'

import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function InsertUser(requestBody: object) {
  try {
    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (data['message:'] === 'Sucess')
      return NextResponse.redirect(new URL('/user/login'))
    return data
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
