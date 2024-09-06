'use client'
import { GetIdCategory } from '@/actions/category/getIdCategory'
import { UpdateCategory } from '@/actions/category/updateCategory'
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

export default function UpdateCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [status, setStatus] = useState<boolean>(false)
  const [data, setData] = useState<CategoryInterface>()
  const [returnError, setReturnError] = useState<string>('')

  useEffect(() => {
    const handleGet = async () => {
      const dt = await GetIdCategory(params.id)
      setData(dt)
    }
    handleGet()
  }, [params.id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateCategory(data, params.id)
    if (req === 'success') {
      setStatus(false)
      alert('Alterado com sucesso!')
      router.back()
    } else {
      setStatus(false)
      setReturnError(req)
    }
    setStatus(false)
  }

  return (
    <>
      <Suspense fallback={<p>Carregando...</p>}>
        <div className="flex flex-col mx-auto justify-center min-h-[800px] w-full items-center">
          <>
            <Link
              href="/category/list"
              className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
            <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
              Alterar a categoria
            </p>
            <form onSubmit={handleSubmit}>
              {returnError && (
                <span className="text-xs text-red-600">{returnError}</span>
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
                  defaultValue={data?.typeCategory ?? ''}
                  required
                />
              </div>
              <div className="flex flex-col mt-3 max-md:mt-3">
                <label htmlFor="urlImageCategory">
                  Imagem de fundo da categoria:
                </label>
                <input
                  type="text"
                  name="urlImageCategory"
                  id="urlImageCategory"
                  className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                  defaultValue={data?.urlImageCategory ?? ''}
                />
              </div>
              <BtnForm pending={status} />
            </form>
          </>
        </div>
      </Suspense>
    </>
  )
}
