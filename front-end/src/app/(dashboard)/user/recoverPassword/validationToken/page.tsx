'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

async function PostToken(body: object) {
  try {
    const response = await Api('/user/recoverPassword/validationToken', {
      method: 'POST',
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

export default function ValidationToken() {
  const [error, setError] = useState<string>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await PostToken(data)
    if (req) setError(req)
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
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Validação de token</p>
      <p className="text-sm w-96 max-md:w-80 text-justify py-3">
        Enviamos um email para o endereço fornecido com as instruções
        necessárias para recuperação de senha. Por favor, insira o token.
      </p>
      <form onSubmit={handleSubmit} className="w-96 max-md:w-80">
        <div className="flex flex-col mt-3">
          <label htmlFor="token">
            Token: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="token"
            id="token"
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
