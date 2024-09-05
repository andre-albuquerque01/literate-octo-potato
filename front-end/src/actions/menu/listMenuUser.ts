'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function ListMenuUserServive() {
  try {
    const response = await ApiRoute(`/menuUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        tags: ['menuId', 'menu', 'menuList'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return []
  }
}
