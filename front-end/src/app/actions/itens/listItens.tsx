'use server'

import ApiRoute from '@/data/apiRoute'
import { NextResponse } from 'next/server'

export async function GetListItens(page: number) {
  const response = await ApiRoute(`/itensa?page=${page}`, {
    next: {
      revalidate: 60,
      tags: ['itens'],
    },
  })
  const datas = await response.json()

  const countPage = datas.meta.last_page
  const data = datas.data

  return NextResponse.json({ data, countPage })
}
