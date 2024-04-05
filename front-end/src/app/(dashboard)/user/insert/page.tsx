'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

async function postInsert(body: object) {
  try {
    const response = await Api('/user/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const reqBody = await response.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
  }
}

export default function InsertUser() {
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
    setReturnError(validatePassword(data.password))
    if (
      data.password === data.password_confirmation &&
      validatePassword(data.password) === ''
    ) {
      const req = await postInsert(data)
      setReturnError(req.message)
      console.log(req.data)

      if (req.message)
        if (req.message.includes('The cpf has already been taken.')) {
          setReturnError('The cpf has already been taken.')
        } else if (req.message.includes('The email has already been taken.')) {
          setReturnError('The email has already been taken.')
        } else if (req.message === 'sucess') {
          alert('Cadastro feito com sucesso!')
          window.history.back()
        }

      return ''
    }
    setReturnError('Senhas não correspondem')
    return ''
  }
  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <Link
        href="/user/login"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form onSubmit={handleSubmit}>
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
        {returnError === 'The cpf has already been taken.' && (
          <span className="text-xs text-red-600">CPF já cadastrado</span>
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
        {returnError === 'The email has already been taken.' && (
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
        <div className="flex flex-row gap-2 mt-3 items-center ">
          <input type="checkbox" name="term_aceite" id="term_aceite" required />
          <Link href="">
            Termos de aceitação <span className="text-red-600">*</span>
          </Link>
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
