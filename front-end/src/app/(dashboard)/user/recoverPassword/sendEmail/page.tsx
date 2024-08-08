'use client'
import { SendEmail } from '@/actions/user/recoverPassword/sendEmail'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SendEmailPage() {
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState(false)
  const router = useRouter()
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await SendEmail(data)

    if (req.message === 'send e-mail') {
      setStatus(false)
      alert('E-mail enviado')
      router.push('/user/recoverPassword/validationToken')
    } else {
      setError('E-mail não encontrado')
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
