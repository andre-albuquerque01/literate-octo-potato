'use client'

import { InsertTable } from '@/actions/table/insertTable'
import { BtnForm } from '@/components/buttons/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Cadastrando...
          </button>
        </div>
      ) : (
        <BtnForm title="Cadastrar" />
      )}
    </>
  )
}
export default function InsertTablePage() {
  const [state, action] = useFormState(InsertTable, {
    ok: false,
    error: '',
    data: null,
  })

  const router = useRouter()
  useEffect(() => {
    if (state && state.ok) {
      alert('Mesa cadastrada com sucesso!')
      router.back()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <div className="flex flex-col mx-auto justify-center md:min-h-screen md:mt-[-100px] w-full items-center">
      <Link
        href="/table/list"
        className="flex items-center gap-1 text-sm w-96 max-md:mt-5 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-4" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro da mesa
      </p>
      {state.error && state.error && (
        <span className="text-xs text-red-600 max-w-80 md:max-w-96 text-justify text-wrap">
          {state.error}
        </span>
      )}
      <form action={action}>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="numberMesa">
            Número da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="numberMesa"
            id="numberMesa"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
          />
        </div>
        {state.error && state.error === 'Número da mesa já cadastrado!' && (
          <span className="text-xs text-red-600">
            Número da mesa já cadastrado!
          </span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="lotacao">
            Capacidade da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="lotacao"
            id="lotacao"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
          />
        </div>
        <FormButton />
      </form>
    </div>
  )
}
