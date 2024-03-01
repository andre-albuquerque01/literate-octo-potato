'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

async function PutPassword(body: object) {
  try {
    const response = await Api('/user/recoverPassword/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (response.ok) alert('Token valido')
    else return 'Token invalido'
  } catch (error) {
    console.error(error)
  }
}

export default function UpdatePassword() {
  const [returnError, setReturnError] = useState<string>('')

  const hasNumber = /\d/
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_=+]/

  const err = [
    'Senha precisa ter pelo menos um número.',
    'Senha precisa ter pelo menos uma letra maiúscula.',
    'Senha precisa ter pelo menos uma letra minúscula.',
    'Senha precisa ter pelo menos um símbolo.',
    'Senhas não correspondem',
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validatePassword(password: any) {
    if (!hasNumber.test(password)) return err[0]
    if (!hasUpperCase.test(password)) return err[1]
    if (!hasLowerCase.test(password)) return err[2]
    if (!hasSymbol.test(password)) return err[3]
    return ''
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (
      data.password === data.password_confirmation &&
      validatePassword(data.password) === ''
    ) {
      const req = await PutPassword(data)
      if (req) setReturnError(req)
      return ''
    }
    setReturnError('Senhas não correspondem')
    return ''
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Trocar senha</p>
      <form onSubmit={handleSubmit} className="w-96 max-md:w-80">
        <div className="flex flex-col mt-3">
          <label htmlFor="password">
            Senha: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        {err.map(
          (erro, key) =>
            returnError === erro && (
              <span key={key} className="text-xs text-red-600">
                {returnError}
              </span>
            ),
        )}
        <div className="flex flex-col mt-3">
          <label htmlFor="password_confirmation">
            Repetir senha: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <BtnForm title="Recuperar" />
      </form>
    </div>
  )
}
