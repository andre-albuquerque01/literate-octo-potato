'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdItensRate(id: string) {
  try {
    const response = await ApiRoute(`/rate/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 30,
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
