'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetAllItens() {
  try {
    const response = await ApiRoute(`/itens`, {
      next: {
        revalidate: 60 * 30,
        tags: ['itens'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Error'
  }
}
