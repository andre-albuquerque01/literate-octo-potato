'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroTable } from '@/data/function/translate/translateErroTable'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateTable(reqBody: object, id: string) {
  try {
    const response = await ApiRoute(`/table/${id}`, {
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
        .map(TranslateErroTable)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      return `Por favor, verifique os seguintes campos:\n${formattedErrors}`
    }
    revalidateTag('table')
    return 'success'
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar o item. Por favor, tente novamente mais tarde.'
  }
}
