'use server'

import ApiRoute from '@/data/apiRoute'
import ApiError from '@/data/function/apiErro'

export async function SendEmailVerification(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiRoute('/reSendEmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (message && message.includes('E-mail não cadastrado.'))
      throw new Error('E-mail não cadastrado.')

    return { data: null, error: '', ok: true }
  } catch (error) {
    return ApiError(error)
  }
}
