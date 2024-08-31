'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroOrder } from '@/data/function/translate/translateErroOrder'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertOrder(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const qtdOrder = request.get('qtdOrder') as string | null
  const valueOrder = request.get('valueOrder') as string | null
  try {
    if (!qtdOrder && !valueOrder) {
      throw new Error('Preencha os dados!')
    }
    const response = await ApiRoute('/order', {
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
        .map(TranslateErroOrder)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      throw new Error(
        `Por favor, verifique os seguintes campos:\n${formattedErrors}`,
      )
    }

    revalidateTag('order')

    return { data: null, error: '', ok: true }
  } catch (error) {
    throw new Error(
      'Desculpe, ocorreu um erro ao cadastrar item. Por favor, tente novamente mais tarde.',
    )
  }
}
