'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdItens(id: string) {
  try {
    const response = await ApiRoute(`/itens/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 30,
        tags: ['itens', 'rate'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return 'Houver erro'
  }
}
