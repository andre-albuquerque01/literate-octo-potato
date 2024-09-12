'use client'
import { UpdatePasswordUser } from '@/actions/user/updatePassword'
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

export default function UpdatePassswordPage() {
  const [returnError, setReturnError] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const req = await UpdatePasswordUser(formData)

    if (req === 'success') {
      alert('Senha alterada com sucesso!')
      setStatus(false)
      router.push('/user')
    }
    setStatus(false)
    setReturnError(req)
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-screen mt-[-100px] w-full items-center">
      <Link
        href="/user"
        className="flex items-center gap-1 text-sm w-96 mt-3 md:mt-10 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Alterar sua senha
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3">
          <label htmlFor="password">
            Senha atual: <span className="text-red-600">*</span>{' '}
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
          <label htmlFor="password_new">
            Nova senha: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="password"
            name="password_new"
            id="password_new"
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
        {returnError && (
          <span className="text-xs text-red-600">{returnError}</span>
        )}
        <BtnForm pending={status} />
      </form>
    </div>
  )
}
