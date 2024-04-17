'use client'
import { UpdateFunction } from '@/app/actions/user/updateFunction'
import { BtnForm } from '@/components/btnForm'
import { validarCPF } from '@/data/function/validateCpf'
import { ArrowLeft } from 'lucide-react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function UpdateFunctionPage() {
  const [returnError, setReturnError] = useState<string>('')
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (!validarCPF(String(data.cpf))) {
      setReturnError('CPF invalido')
      return ''
    }
    const req = await UpdateFunction(data)
    if (req) {
      alert('Alterado com sucesso!')
      router.back()
    } else {
      alert('Não foi possível fazer alteração!')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center min-h-[80%] w-full items-center">
      <Link
        href="/user"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Alterar papel do usuário
      </p>
      <form onSubmit={handleSubmit}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
        >
          <div className="flex flex-col mt-3 max-md:mt-3">
            <label htmlFor="cpf">
              CPF do usuário: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="00000000000"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {returnError === 'CPF invalido' && (
            <span className="text-xs text-red-600">CPF inválido.</span>
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="role">
              Nova função: <span className="text-red-600">*</span>{' '}
            </label>
            <select
              name="role"
              id="role"
              className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
              required
            >
              <option value="">Selecione a função</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <BtnForm title="Alterar" />
        </ReCaptchaProvider>
      </form>
    </div>
  )
}
