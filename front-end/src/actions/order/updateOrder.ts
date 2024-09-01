'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroOrder } from '@/data/function/translate/translateErroOrder'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateOrder(reqBody: object, id: string) {
  try {
    const response = await ApiRoute(`/order/${id}`, {
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
        .map(TranslateErroOrder)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      return `Por favor, verifique os seguintes campos:\n${formattedErrors}`
    }
    revalidateTag('order')
    return 'success'
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar o item. Por favor, tente novamente mais tarde.'
  }
}
