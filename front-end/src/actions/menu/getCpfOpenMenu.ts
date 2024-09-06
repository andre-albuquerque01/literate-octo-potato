'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
export async function GetCpfOpenMenu(cpf: string) {
  try {
    const response = await ApiRoute(`/menucpfOpen/${cpf}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 30,
        tags: ['menuId', 'menu', 'menuList'],
      },
    })

    const datas = await response.json()
    const data = datas.data

    return data
  } catch (error) {
    return []
  }
}
