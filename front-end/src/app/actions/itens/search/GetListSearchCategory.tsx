'use server'

import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GetListSearchCategory(
  typeCategory: string,
  page: number,
) {
  try {
    const response = await ApiRoute(`/itensc/${typeCategory}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
      },
    })
    const datas = await response.json()
    const countPage = datas.meta.last_page
    const data = datas.data

    return NextResponse.json({ data, countPage })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
