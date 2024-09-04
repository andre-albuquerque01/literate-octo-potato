'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { revalidatePathAction } from '../revalidate/revalidatePathAction'
import { ErrorResponse } from '@/data/type/erros'
import { TranslateErroTable } from '@/data/function/translate/translateErroTable'

export async function InsertTable(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const numberMesa = request.get('numberMesa') as string | null
  const lotacao = request.get('lotacao') as string | null

  try {
    if (!numberMesa || !lotacao) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiRoute('/table', {
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
        .map(TranslateErroTable)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      throw new Error(
        `Por favor, verifique os seguintes campos:\n${formattedErrors}`,
      )
    }

    revalidateTag('table')
    revalidatePathAction('/table')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return {
      data: null,
      error:
        'Desculpe, ocorreu um erro ao cadastrar item. Por favor, tente novamente mais tarde.',
      ok: false,
    }
  }
}
