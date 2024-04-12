'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetAllCategory() {
  try {
    const response = await ApiRoute(`/category`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 10,
        tags: ['category'],
      },
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
