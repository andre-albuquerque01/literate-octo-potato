'use client'
import { ValidationToken } from '@/app/actions/user/recoverPassword/validationToken'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function ValidationTokenPage() {
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await ValidationToken(data)
    if (req.token) {
      setStatus(false)
      alert('Token valido')
      router.push('/user/recoverPassword/updatePassword')
    } else if (req.message && req.error) {
      setError('Token expirado')
    } else {
      setError('Token invalido')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center md:h-[800px] max-md:h-[800px] w-full items-center">
      <div className="md:hidden h-20">
        <Link
          href="/user/sendEmail"
          className="flex items-center gap-1 text-sm w-96  max-md:w-80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
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
        <div className="flex justify-center">
          <button
            disabled={status}
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}
