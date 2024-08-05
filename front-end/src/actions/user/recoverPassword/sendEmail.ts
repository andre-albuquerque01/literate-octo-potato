'use server'

import ApiRoute from '@/data/apiRoute'

export async function SendEmail(requestBody: object) {
  try {
    const response = await ApiRoute('/sendTokenRecover', {
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
    return 'Houve error'
  }
}
