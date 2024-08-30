'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
export async function GetCpfMenu(cpf: string, page: number) {
  try {
    const response = await ApiRoute(`/menucpf/${cpf}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 30,
        tags: ['menuList'],
      },
    })

    const datas = await response.json()
    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}
