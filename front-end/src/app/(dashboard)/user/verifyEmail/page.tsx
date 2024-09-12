'use client'

import { SendEmailVerification } from '@/actions/user/sendEmailVerification'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

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
            Enviando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Enviar
          </button>
        </div>
      )}
    </>
  )
}

export default function VerifyEmaiPage() {
  const [state, action] = useFormState(SendEmailVerification, {
    ok: false,
    error: '',
    data: null,
  })

  const router = useRouter()
  useEffect(() => {
    if (state && state.ok) {
      alert('Email enviado!')
      router.push('/user/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  return (
    <div className="flex flex-col mx-auto justify-center h-screen mt-[-100px] w-full items-center">
      <Link
        href="/user/login"
        className="flex items-center gap-1 text-sm w-96 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">
        Validação do e-mail
      </p>
      <p className="text-sm w-96 max-md:w-80 text-justify py-3">
        Enviaremos um email para o endereço fornecido com as instruções
        necessárias para validação do e-mail. Por favor, verifique sua caixa de
        entrada e também a pasta de spam, caso não encontre o email em sua caixa
        principal.
      </p>
      <form action={action} className="w-96 max-md:w-80">
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
          {state.error && state.error}
        </span>
        <BtnForm />
      </form>
    </div>
  )
}
