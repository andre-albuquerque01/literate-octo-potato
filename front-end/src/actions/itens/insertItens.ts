'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroItens } from '@/data/function/translate/translateErroItens'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertItens(request: FormData) {
  const title = request.get('title') as string | null
  const description = request.get('description') as string | null
  const value = request.get('value') as string | null
  const qtdIten = request.get('qtdIten') as string | null
  const urlImage = request.get('urlImage') as string | null
  const waitTime = request.get('waitTime') as string | null
  const idCategory = request.get('idCategory') as string | null
  const position = request.get('position') as string | null
  try {
    if (
      !title &&
      !description &&
      !urlImage &&
      !qtdIten &&
      !value &&
      !waitTime &&
      !idCategory &&
      !position
    ) {
      return 'Preencha os dados!'
    }
    const response = await ApiRoute('/itens', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: request,
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
