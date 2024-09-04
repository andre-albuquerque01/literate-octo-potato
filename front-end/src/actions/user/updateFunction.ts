'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroUser } from '@/data/function/translate/translateErroUser'
import { ErrorResponse } from '@/data/type/erros'
import { cookies } from 'next/headers'

export async function UpdateFunction(reqBody: object) {
  try {
    const response = await ApiRoute('/userRole', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data = (await response.json()) as ErrorResponse

    if (!response.ok) {
      const errorsArray = Object.values(data.errors ?? {})
        .flat()
        .map(TranslateErroUser)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      return `Por favor, verifique os seguintes campos:\n${formattedErrors}`
    }

    return true
  } catch (error) {
    return 'Houver error'
  }
}
