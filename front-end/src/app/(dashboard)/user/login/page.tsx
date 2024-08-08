/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { VerifyEmail } from '@/actions/user/verifyEmail'
import { LoginUser } from '@/actions/user/login'

export default function Login({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const [message, setMessage] = useState<string>('')
  useEffect(() => {
    if (searchParams.q) {
      const { q } = searchParams
      const handleSearch = async () => {
        const request = await VerifyEmail(q)
        if (request) {
          setMessage('E-mail verificado com sucesso!')
        }
      }
      handleSearch()
    }
  }, [])
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await LoginUser(data)

    if (req.message === 'sucess') {
      setStatus(false)
      window.location.replace('/user')
    } else if (req.message === 'E-mail não verificado') {
      setError('E-mail não verificado')
      setStatus(false)
    } else {
      setError('E-mail ou senha invalida.')
      setStatus(false)
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center md:h-[800px] max-md:h-[100%] w-full items-center">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-10 w-96 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Login</p>
      <form className="w-96 max-md:w-80" onSubmit={handleSubmit}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
        >
          <span className="text-blue-600 text-xs">{message}</span>
          <div className="flex flex-col mt-3">
            <label htmlFor="email">
              E-mail: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full h-9 border border-zinc-400 rounded-[5px] px-2"
              required
            />
          </div>
          <span className="text-red-600 text-xs">
            {error}{' '}
            {error === 'E-mail não verificado' && (
              <Link href="/user/verifyEmail" className="underline">
                Enviar novamente
              </Link>
            )}
          </span>
          <div className="flex flex-col mt-3">
            <label htmlFor="password">
              Senha: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full h-9 border border-zinc-400 rounded-[5px] px-2"
              required
            />
          </div>
          <Link
            href="/user/recoverPassword/sendEmail"
            className="flex flex-row gap-2 mt-3 items-center text-xs hover:text-zinc-600"
          >
            Esquece a senha?
          </Link>
          <div className="flex justify-center">
            <button
              disabled={status}
              className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            >
              Entrar
            </button>
          </div>
        </ReCaptchaProvider>
      </form>
      <div className="w-80 max-md:w-64 mt-5 max-md:mt-2 h-[0.5px] bg-black"></div>
      <Link
        href="/user/insert"
        className="text-xs mt-3 max-md:mt-2 hover:text-zinc-600"
      >
        Não tem cadastro? Clique para cadastrar
      </Link>
    </div>
  )
}
