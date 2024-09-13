'use client'
import { RecoverUpdatePassword } from '@/actions/user/recoverPassword/recoverUpdatePassword'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const BtnForm = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Alterando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Alterar
          </button>
        </div>
      )}
    </>
  )
}

export default function UpdatePassword({
  params,
}: {
  params: { token: string }
}) {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      token: params.token,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      password_confirmation: formData.get('password_confirmation') as string,
    }
    const response = await RecoverUpdatePassword(data)
    if (response === '') {
      alert('Alterado com sucesso!')
      router.push('/user/login')
    } else setError(response)
    setStatus(false)
  }
  return (
    <div className="flex flex-col mx-auto justify-center h-screen mt-[-100px] w-full items-center">
      <Link
        href="/user/recoverPassword/sendEmail"
        className="flex items-center gap-1 text-sm w-96 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:w-80">Trocar senha</p>
      <form onSubmit={handleSubmit} className="w-96 max-md:w-80">
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            Email: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
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
        <p className="text-xs text-red-600">{error && error}</p>
        <BtnForm pending={status} />
      </form>
    </div>
  )
}
