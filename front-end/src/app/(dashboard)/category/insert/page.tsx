'use client'
import { InsertCategory } from '@/actions/category/insertCategory'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const BtnForm = () => {
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
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Cadastrar
          </button>
        </div>
      )}
    </>
  )
}

export default function InsertCategoryPage() {
  const [state, action] = useFormState(InsertCategory, {
    ok: false,
    error: '',
    data: null,
  })

  const router = useRouter()
  useEffect(() => {
    if (state && state.ok) {
      alert('Cadastrado com sucesso!')
      router.back()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <div className="flex flex-col mx-auto justify-center min-h-[800px] w-full items-center">
      <Link
        href="/category/list"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro de categoria
      </p>
      <form action={action}>
        {state && state.error && (
          <span className="text-xs text-red-600">{state.error}</span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="typeCategory">
            Nome da categoria: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="typeCategory"
            id="typeCategory"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="urlImageCategory">
            Imagem de fundo da categoria:{' '}
            <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="urlImageCategory"
            id="urlImageCategory"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <BtnForm />
      </form>
    </div>
  )
}
