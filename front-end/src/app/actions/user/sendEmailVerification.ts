'use server'

import ApiRoute from '@/data/apiRoute'

export async function SendEmailVerification(requestBody: { email: string }) {
  try {
    if (!requestBody.email) {
      return { message: 'E-mail invalido' }
    }
    const response = await ApiRoute('/reSendEmail', {
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
