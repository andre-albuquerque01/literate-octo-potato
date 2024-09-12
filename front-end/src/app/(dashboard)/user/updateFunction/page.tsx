'use client'
import { UpdateFunction } from '@/actions/user/updateFunction'
import { ValidateCpf } from '@/data/function/validateCpf'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import ReactInputMask from 'react-input-mask-next'

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

export default function UpdateFunctionPage() {
  const [returnError, setReturnError] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    if (!ValidateCpf(String(data.cpf))) {
      setStatus(false)
      setReturnError('CPF inválido')
    }
    const req = await UpdateFunction(data)
    if (req) {
      setStatus(false)
      alert('Alterado com sucesso!')
      router.back()
    } else {
      setStatus(false)
      setReturnError(req)
      alert('Não foi possível fazer alteração!')
    }
    setStatus(false)
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-screen mt-[-100px] w-full items-center">
      <Link
        href="/user"
        className="flex items-center gap-1 text-sm w-96 md:mt-10 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Alterar papel do usuário
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="cpf">
            CPF do usuário: <span className="text-red-600">*</span>{' '}
          </label>
          <ReactInputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Informe o número do documento"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        {returnError && (
          <span className="text-xs text-red-600">{returnError}</span>
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
        <BtnForm pending={status} />
      </form>
    </div>
  )
}
