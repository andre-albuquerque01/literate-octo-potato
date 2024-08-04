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
      next: {
        revalidate: 1,
        tags: ['rate'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 401,
    })
  }
}
