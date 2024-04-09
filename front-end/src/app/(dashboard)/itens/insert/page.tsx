'use client'
import { GetAllCategory } from '@/app/actions/category/getAllCatgeory'
import { InsertItens } from '@/app/actions/itens/insertItens'
import { BtnForm } from '@/components/btnForm'
import { CategoryInterface } from '@/data/type/category'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

export default function InsertItensPage() {
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [returnError, setReturnError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const handleCategory = async () => {
      const dt = await GetAllCategory()
      const data = dt.data

      setCategory(data)
    }
    handleCategory()
  }, [])

  async function handleSubmite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await InsertItens(data)

    if (req) {
      alert('Item cadastrado')
      router.push('/itens/list')
    } else {
      setReturnError('The slug has already been taken.')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <Link
        href="/itens/list"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro do item
      </p>
      <Suspense fallback={'Carregando...'}>
        <form onSubmit={handleSubmite}>
          <div className="flex flex-col mt-3 max-md:mt-3">
            <label htmlFor="title">
              Titulo: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="desc">
              Descrição: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="desc"
              id="desc"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="value">
              Valor: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="value"
              id="value"
              step={0.01}
              min={0}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="qtdIten">
              Quantidade de iten: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="qtdIten"
              id="qtdIten"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="slug">
              Slug (Como deve chamar o iten, na url):{' '}
              <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {returnError === 'The slug has already been taken.' && (
            <span className="text-xs text-red-600">Slug já cadastrado</span>
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="urlImage">
              Caminho da imagem: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="urlImage"
              id="urlImage"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="waitTime">
              Tempo de espera: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="waitTime"
              id="waitTime"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="idCategory">
              Categoria: <span className="text-red-600">*</span>{' '}
            </label>
            <select
              name="idCategory"
              id="idCategory"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
              required
            >
              <option defaultValue={0}>Selecione a categoria</option>
              {category &&
                category.map((categ, key) => (
                  <option value={categ.idCategory} key={key}>
                    {categ.typeCategory}
                  </option>
                ))}
            </select>
            {category.length === 0 && (
              <Link
                href="/category/insert"
                className="text-blue-600 text-sm underline"
              >
                Não tem categoria?
              </Link>
            )}
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="position">
              Posição do item: <span className="text-red-600">*</span>{' '}
            </label>
            <select
              name="position"
              id="position"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
              required
            >
              <option defaultValue={0}>Selecione a posição</option>
              <option value="carrossel">Carrossel</option>
              <option value="entrada">Entrada</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <BtnForm title="Cadastrar" />
        </form>
      </Suspense>
    </div>
  )
}
