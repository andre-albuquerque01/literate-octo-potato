'use client'
import { SendEmailVerification } from '@/app/actions/user/sendEmailVerification'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function VerifyEmaiPage() {
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState(false)
  const router = useRouter()
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    if (e.currentTarget.email.value !== '') {
      const req = await SendEmailVerification({
        email: e.currentTarget.email.value,
      })
      if (req.message === 'sucess') {
        setStatus(false)
        alert('E-mail enviado')
        router.back()
      } else if (req.message === 'E-mail não cadastrado.') {
        setStatus(false)
        setError('E-mail não cadastrado.')
      } else {
        setStatus(false)
        setError('E-mail não encontrado')
      }
    } else {
      setError('Preencha o campo e-mail')
    }
  }

  return (
    <div className="flex flex-col md:h-[800px] justify-center max-md:h-[800px] items-center">
      <Link
        href="/user/login"
        className="md:hidden flex items-center gap-1 text-sm mb-10 w-96 max-md:w-80"
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
        <div className="flex justify-center">
          <button
            disabled={status}
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
