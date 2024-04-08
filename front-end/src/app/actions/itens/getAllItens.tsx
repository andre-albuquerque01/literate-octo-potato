'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetAllItens() {
  try {
    const response = await ApiRoute(`/itens`, {
      next: {
        revalidate: 60,
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    return new Response(JSON.stringify('error'), {
      status: 401,
    })
  }
}
