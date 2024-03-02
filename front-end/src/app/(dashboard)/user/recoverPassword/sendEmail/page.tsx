'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

async function PostSendEmail(body: object) {
  try {
    const response = await Api('/user/recoverPassword/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      alert('E-mail enviado')
      window.location.href = '/user/recoverPassword/validationToken'
    } else return 'E-mail não encontrado'
  } catch (error) {
    console.error(error)
  }
}

export default function SendEmail() {
  const [error, setError] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await PostSendEmail(data)
    if (req) setError(req)
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <div className="h-20">
        <Link
          href="/user/login"
          className="flex items-center gap-1 text-sm w-96  max-md:w-80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Recuperar senha</p>
      <p className="text-sm w-96 max-md:w-80 text-justify py-3">
        Enviaremos um email para o endereço fornecido com as instruções
        necessárias para recuperação de senha. Por favor, verifique sua caixa de
        entrada e também a pasta de spam, caso não encontre o email em sua caixa
        principal.
      </p>
      <form onSubmit={handleSubmit} className="w-96 max-md:w-80">
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
        <span className="text-red-600 text-xs">{error}</span>
        <BtnForm title="Próximo" />
      </form>
    </div>
  )
}
