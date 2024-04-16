'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GetCpfMenu(cpf: string, page: number) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute(`/menucpf/${cpf}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
      next: {
        revalidate: 30,
        tags: ['menuList'],
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
