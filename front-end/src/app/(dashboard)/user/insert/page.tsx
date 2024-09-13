'use client'
import { InsertUser } from '@/actions/user/insertUser'
import { BtnForm } from '@/components/buttons/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import ReactInputMask from 'react-input-mask-next'

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
    <div className="flex flex-col mx-auto justify-center h-screen max-md:mt-10 md:mt-[-115px] w-full items-center">
      <Link
        href="/user/login"
        className="flex items-center gap-1 text-sm w-96 mt-3 md:mt-10 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form action={action}>
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
            placeholder="Informe o nome"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
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
            placeholder="Informe o sobrenome"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="DDD">
            DDD: <span className="text-red-600">*</span>{' '}
          </label>
          <ReactInputMask
            mask="99"
            name="DDD"
            id="DDD"
            min="0"
            maxLength={999}
            placeholder="Informe o número do DDD"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="phoneNumber">
            Número de telefone: <span className="text-red-600">*</span>{' '}
          </label>
          <ReactInputMask
            mask="99999-9999"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Informe o número de telefone"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="cpf">
            CPF: <span className="text-red-600">*</span>{' '}
          </label>
          <ReactInputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Informe o número do documento"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        {state && state.error === 'CPF já usado.' && (
          <span className="text-xs text-red-600">CPF já cadastrado</span>
        )}
        {state && state.error === 'O campo cpf é obrigatório.' && (
          <span className="text-xs text-red-600">
            O campo cpf é obrigatório.
          </span>
        )}
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            E-mail: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Informe o e-mail"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        {state && state.error === 'E-mail já cadastrado!' && (
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
            placeholder="Informe a senha"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
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
            placeholder="Repita a senha novamente"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 outline-none"
            required
          />
        </div>
        <div className="flex flex-row gap-2 mt-3 items-center ">
          <input type="checkbox" name="term_aceite" id="term_aceite" />
          <Link href="">
            Termos de aceitação <span className="text-red-600">*</span>
          </Link>
        </div>
        {state &&
          state.error !== 'O campo cpf é obrigatório.' &&
          state.error !== 'The cpf has already been taken.' &&
          state.error !== 'Número de celular invalido.' &&
          state.error !== 'Preencha os dados!' &&
          state.error !== 'E-mail já cadastrado!' &&
          state.error !== 'CPF já usado.' &&
          state.error && (
            <span className="text-xs text-red-600">{state.error}</span>
          )}
        <div className="flex justify-center">
          <FormButton />
        </div>
      </form>
    </div>
  )
}
