'use server'

import ApiRoute from '@/data/apiRoute'

export async function InsertUser(requestBody: object) {
  try {
    const response = await ApiRoute('/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    return data
  } catch (error) {
    return 'Houver error'
  }
}
