'use server'

import ApiRoute from '@/data/apiRoute'
import ApiError from '@/data/function/apiErro'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function LoginUser(
  state: { ok: boolean; data: null; error: string },
  request: FormData,
) {
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null
  try {
    if (!email || !password) {
      throw new Error('Preenchas os dados!')
    }
    const cookiesStore = cookies()

    const response = await ApiRoute('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error('error')
    }

    if (data.message === 'Email ou senha incorreta.') {
      throw new Error('Email ou senha incorreta.')
    }
    if (data.message === 'E-mail não verificado') {
      throw new Error('E-mail não verificado')
    }

    cookiesStore.set('token', data.data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })
    if (data.data.r === 'JesusIsKingADM') {
      cookiesStore.set('r', data.data.r, {
        expires: Date.now() + 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    }
  } catch (error) {
    return ApiError(error)
  }
  redirect('/user')
}
