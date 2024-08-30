'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroItens } from '@/data/function/translate/translateErroItens'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateItens(reqBody: object, id: string) {
  try {
    const response = await ApiRoute(`/itens/${id}`, {
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
        .map(TranslateErroItens)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      return `Por favor, verifique os seguintes campos:\n${formattedErrors}`
    }
    revalidateTag('itens')
    return 'success'
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao cadastrar o item. Por favor, tente novamente mais tarde.'
  }
}
