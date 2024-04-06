'use client'
import { UpdateCategory } from '@/app/actions/category/updateCategory'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { CategoryInterface } from '@/data/type/category'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

async function getCategory(id: number) {
  try {
    const request = await Api(`/category/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
      },
    })
    const reqJson = await request.json()
    return reqJson.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function UpdateCategoryPage({
  params,
}: {
  params: { id: number }
}) {
  const router = useRouter()
  const [data, setData] = useState<CategoryInterface>()

  useEffect(() => {
    const handleGet = async () => {
      const getData = await getCategory(params.id)
      setData(getData)
    }
    handleGet()
  }, [params.id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateCategory(data, params.id)
    if (req) {
      alert('Alterado com sucesso!')
      router.back()
    } else {
      alert('Não foi possível fazer a alteração!')
    }
  }

  return (
    <>
      <Suspense fallback={<p>Carregando...</p>}>
        <div className="flex flex-col mx-auto justify-center min-h-[80%] w-full items-center">
          {data?.typeCategory !== undefined ? (
            <>
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
                <BtnForm title="Alterar" />
              </form>
            </>
          ) : (
            <h1>Categoria não encontrada!</h1>
          )}
        </div>
      </Suspense>
    </>
  )
}
