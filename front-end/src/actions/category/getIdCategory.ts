'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdCategory(id: string) {
  try {
    const response = await ApiRoute(`/category/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Error'
  }
}
