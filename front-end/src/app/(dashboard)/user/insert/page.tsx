'use client'
import { InsertUser } from '@/actions/user/insertUser'
import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
          disabled={pending}
        >
          Cadastrando...
        </button>
      ) : (
        <BtnForm title="Cadastrar" />
      )}
    </>
  )
}

export default function InsertUserPage() {
  const [state, action] = useFormState(InsertUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <div className="flex flex-col mx-auto justify-center h-[800px] w-full items-center">
      <Link
        href="/user/login"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form action={action}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
        >
          {state && state.error === 'Preencha os dados!' && (
            <span className="text-xs text-red-600">Preencha os dados!</span>
          )}
          <div className="flex flex-col mt-3 max-md:mt-3">
            <label htmlFor="firstName">
              Primeiro nome: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="lastName">
              Sobrenome: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="DDD">
              DDD: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="DDD"
              id="DDD"
              min="0"
              maxLength={999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="phoneNumber">
              Número de telefone: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              min={9999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {state && state.error === 'Número de celular invalido.'}
          <div className="flex flex-col mt-3">
            <label htmlFor="cpf">
              CPF: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              min={9999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {state && state.error === 'The cpf has already been taken.' && (
            <span className="text-xs text-red-600">CPF já cadastrado</span>
          )}
          {state && state.error === 'CPF invalido' && (
            <span className="text-xs text-red-600">CPF inválido.</span>
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="email">
              E-mail: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {state && state.error === 'The email has already been taken.' && (
            <span className="text-xs text-red-600">E-mail já cadastrado</span>
          )}
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
          <div className="flex flex-row gap-2 mt-3 items-center ">
            <input type="checkbox" name="term_aceite" id="term_aceite" />
            <Link href="">
              Termos de aceitação <span className="text-red-600">*</span>
            </Link>
          </div>
          {state && state.error && (
            <span className="text-xs text-red-600">{state.error}</span>
          )}
          <div className="flex justify-center">
            <FormButton />
          </div>
        </ReCaptchaProvider>
      </form>
    </div>
  )
}
