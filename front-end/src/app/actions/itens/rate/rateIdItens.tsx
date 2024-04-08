'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdItensRate(id: number) {
  try {
    const response = await ApiRoute(`/rate/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
