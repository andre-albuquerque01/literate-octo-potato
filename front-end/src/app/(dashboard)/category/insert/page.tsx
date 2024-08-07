'use client'
import { InsertCategory } from '@/actions/category/insertCategory'
import { BtnForm } from '@/components/btnForm'
import { ValidateFormCategoria } from '@/data/function/validateFormCategoria'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function InsertCategoryPage() {
  const [returnError, setReturnError] = useState<string>('')
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const val = ValidateFormCategoria(
      e.currentTarget.typeCategory.value,
      e.currentTarget.urlImageCategory.value,
    )

    if (val !== '') setReturnError(val)

    const req = await InsertCategory(data)
    if (req) {
      alert('Cadastrado com sucesso!')
      router.back()
    } else {
      alert('Não foi possível fazer o cadastrado!')
    }
  }

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
      <form onSubmit={handleSubmit}>
        {returnError === 'Preencha os dados!' && (
          <span className="text-xs text-red-600">Preencha os dados!</span>
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
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
