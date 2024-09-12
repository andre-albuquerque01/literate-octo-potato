'use client'
import { ShowUser } from '@/actions/user/showUser'
import { UpdateUser } from '@/actions/user/updateUser'
import { UserInterface } from '@/data/type/user'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

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

export default function UpdateUserPage() {
  const [returnError, setReturnError] = useState<string>('')
  const [data, setData] = useState<UserInterface>()
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    const get = async () => {
      const dt = await ShowUser()
      setData(dt)
    }
    get()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const req = await UpdateUser(formData)
    if (req === '') {
      alert('Alterado com sucesso.')
      router.back()
    }
    setReturnError(req)
    setStatus(false)
  }

  return (
    <Suspense>
      <div className="flex flex-col mx-auto justify-center h-screen md:mt-[-115px] w-full items-center">
        <Link
          href="/user"
          className="flex items-center gap-1 text-sm w-96 mt-3 md:mt-10 max-md:w-80 mb-5"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
        <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
          Alterar seus dados
        </p>
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
              defaultValue={data?.firstName ?? ''}
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
              defaultValue={data?.lastName ?? ''}
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
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              defaultValue={data?.DDD ?? ''}
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="phoneNumber">
              Número de telefone: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              defaultValue={data?.phoneNumber ?? ''}
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="cpf">
              CPF: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              className="w-96 h-9 border bg-zinc-400 rounded-[5px] max-md:w-80 px-2"
              defaultValue={data?.cpf}
              readOnly
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
              className="w-96 h-9 border bg-zinc-400 rounded-[5px] max-md:w-80 px-2"
              defaultValue={data?.email}
              readOnly
              required
            />
          </div>
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
          <BtnForm pending={status} />
        </form>
      </div>
    </Suspense>
  )
}
