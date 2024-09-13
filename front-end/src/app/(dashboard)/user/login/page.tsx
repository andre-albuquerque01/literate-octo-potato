/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { LoginUser } from '@/actions/user/login'
import { GoBack } from '@/components/nav/goBack'

const BtnForm = () => {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Entrando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Entrar
          </button>
        </div>
      )}
    </>
  )
}

export default function Login() {
  const [state, action] = useFormState(LoginUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <div className="flex flex-col mx-auto justify-center h-screen mt-[-100px] w-full items-center">
      <GoBack />
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80 mt-5">Login</p>
      <form className="w-96 max-md:w-80" action={action}>
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            E-mail: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-9 border border-zinc-400 rounded-[5px] px-2 outline-none"
            required
          />
        </div>
        <span className="text-red-600 text-xs">
          {state.error && state.error}{' '}
          {state.error && state.error === 'E-mail não verificado' && (
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
            className="w-full h-9 border border-zinc-400 rounded-[5px] px-2 outline-none"
            required
          />
        </div>
        <Link
          href="/user/recoverPassword/sendEmail"
          className="flex flex-row gap-2 mt-3 items-center text-xs hover:text-zinc-600"
        >
          Esquece a senha?
        </Link>
        <BtnForm />
      </form>
      <div className="w-80 max-md:w-64 mt-5 max-md:mt-2 h-[0.5px] bg-black"></div>
      <Link
        href="/user/insert"
        className="text-xs mt-3 text-blue-600 max-md:mt-2 hover:text-zinc-600"
      >
        Não tem cadastro? Clique para cadastrar
      </Link>
    </div>
  )
}
