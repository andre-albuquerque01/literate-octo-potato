'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdCategory(id: number) {
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

    return data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
