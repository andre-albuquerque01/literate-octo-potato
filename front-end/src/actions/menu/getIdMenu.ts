'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function GetIdMenuService(id: string) {
  try {
    const response = await ApiRoute(`/menu/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      cache: 'no-cache',
      next: {
        tags: ['menuId', 'menu', 'menuList'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Error'
  }
}
