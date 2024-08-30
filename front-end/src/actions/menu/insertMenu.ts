'use server'

import ApiRoute from '@/data/apiRoute'
import { TranslateErroMenu } from '@/data/function/translate/translateErroMenu'
import { ErrorResponse } from '@/data/type/erros'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function InsertMenu(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const cpf = request.get('cpf') as string | null
  const idMesa = request.get('idMesa') as string | null
  const statusOrder = request.get('statusOrder') as string | null
  try {
    if (!cpf && !idMesa && !statusOrder) {
      throw new Error('Preencha os dados!')
    }
    const response = await ApiRoute('/menu', {
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
        .map(TranslateErroMenu)

      const formattedErrors = errorsArray
        .map((error) => `- ${error}`)
        .join('\n')

      throw new Error(
        `Por favor, verifique os seguintes campos:\n${formattedErrors}`,
      )
    }

    revalidateTag('menu')
    revalidateTag('menuList')

    return { data: null, error: '', ok: true }
  } catch (error) {
    throw new Error(
      'Desculpe, ocorreu um erro ao cadastrar o pedido. Por favor, tente novamente mais tarde.',
    )
  }
}
