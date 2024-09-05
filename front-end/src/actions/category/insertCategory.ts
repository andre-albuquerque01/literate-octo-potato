'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroCategory } from '@/data/function/translate/translateErroCategory'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertCategory(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const typeCategory = request.get('typeCategory') as string | null
  const urlImageCategory = request.get('urlImageCategory') as string | null
  try {
    if (!typeCategory && !urlImageCategory) {
      throw new Error('Preencha os dados!')
    }
    const response = await ApiRoute('/category', {
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
        .map(TranslateErroCategory)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      throw new Error(
        `Por favor, verifique os seguintes campos:\n${formattedErrors}`,
      )
    }

    revalidateTag('category')

    return { data: null, error: '', ok: true }
  } catch (error) {
    console.error(error)
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Desculpe, ocorreu um erro ao cadastrar. Por favor, tente novamente mais tarde.'

    return {
      data: null,
      error: errorMessage,
      ok: false,
    }
  }
}
