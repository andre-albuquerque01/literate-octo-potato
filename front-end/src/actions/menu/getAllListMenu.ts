'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetAllListMenu(page: number) {
  try {
    const response = await ApiRoute(`/menuA?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 30,
        tags: ['menuId', 'menu', 'menuList'],
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
