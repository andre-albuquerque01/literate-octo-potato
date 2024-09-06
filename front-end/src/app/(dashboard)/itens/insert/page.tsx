'use client'
import { GetAllCategory } from '@/actions/category/getAllCatgeory'
import { InsertItens } from '@/actions/itens/insertItens'
import Loading from '@/app/loading'
import { CategoryInterface } from '@/data/type/category'
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

export default function InsertItensPage() {
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [returnError, setReturnError] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const handleCategory = async () => {
      const data = await GetAllCategory()
      setCategory(data)
    }
    handleCategory()
  }, [])

  async function handleSubmite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const req = await InsertItens(formData)

    if (req === 'success') {
      setStatus(false)
      alert('Item cadastrado!')
      router.push('/itens/list')
    } else {
      setStatus(false)
      setReturnError(req)
    }
    setStatus(false)
  }

  return (
    <div className="flex flex-col mx-auto items-center  max-md:min-h-[100%] max-md:max-h-[150%] md:mt-5 w-full">
      <Link
        href="/itens/list"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-10 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro do item
      </p>
      {returnError && (
        <span className="text-xs text-red-600 max-w-80 md:max-w-96 text-justify text-wrap">
          {returnError}
        </span>
      )}
      <Suspense fallback={<Loading />}>
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
            <label htmlFor="description">
              Descrição: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="value">
              Valor: R$<span className="text-red-600">*</span>{' '}
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
              Quantidade de item: <span className="text-red-600">*</span>{' '}
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
          <BtnForm pending={status} />
        </form>
      </Suspense>
    </div>
  )
}
