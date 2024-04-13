'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetIdItens(id: number) {
  try {
    const response = await ApiRoute(`/itens/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
        tags: ['itens'],
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    return 'Houver erro'
  }
}
