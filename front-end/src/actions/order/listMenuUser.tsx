'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export default async function ListMenuUserSerive() {
  try {
    const response = await ApiRoute(`/menuUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return []
  }
}
