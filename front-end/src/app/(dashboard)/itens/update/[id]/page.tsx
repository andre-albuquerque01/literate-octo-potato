'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { CategoryInterface } from '@/data/type/category'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

async function getCategory(): Promise<CategoryInterface[]> {
  try {
    const request = await Api('/category/getAll', {
      cache: 'no-cache',
    })
    const reqJson = await request.json()
    return reqJson.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getItens(id: number): Promise<InterfaceItens> {
  try {
    const request = await Api(`/itens/${id}`, {
      cache: 'no-cache',
    })
    const reqJson = await request.json()
    return reqJson.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function putItens(body: object, id: number) {
  try {
    const request = await Api(`/itens/update/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (request.ok) return request.json()
  } catch (error) {
    console.error(error)
  }
}

export default function UpdateItens({ params }: { params: { id: number } }) {
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [itens, setItens] = useState<InterfaceItens>()
  const [returnError, setReturnError] = useState<string>('')

  useEffect(() => {
    const handleCategory = async () => {
      const catego = await getCategory()
      setCategory(catego)
    }
    handleCategory()

    const handleItens = async () => {
      const itens = await getItens(params.id)
      setItens(itens)
    }
    handleItens()
  }, [])

  async function handleSubmite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await putItens(data, params.id)

    if (req.data.message === 'sucess') {
      alert('Item alterado')
      window.location.href = ''
    } else {
      setReturnError('The slug has already been taken.')
    }
  }

  return (
    <div className="flex flex-col mx-auto items-center h-[90%] max-md:min-h-[100%] max-md:max-h-[150%] md:mt-5 w-full">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Alterar item</p>
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
            value={itens?.title}
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
            value={itens?.desc}
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
            value={itens?.value}
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
            value={itens?.qtdIten}
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
            value={itens?.slug}
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
            value={itens?.urlImage}
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
            value={itens?.waitTime}
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
            value={itens?.idCategory}
            required
          >
            <option>Selecione a categoria</option>
            {category.map((categ, key) => (
              <option value={categ.idCategory} key={key}>
                {categ.typeCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="position">
            Posição do item: <span className="text-red-600">*</span>{' '}
          </label>
          <select
            name="position"
            id="position"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
            value={itens?.position}
            required
          >
            <option>Selecione a posição</option>
            <option value="carrossel">Carrossel</option>
            <option value="entrada">Entrada</option>
            <option value="outros">Outros</option>
          </select>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="statusIten">
            Status do item: <span className="text-red-600">*</span>{' '}
          </label>
          <select
            name="statusIten"
            id="statusIten"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
            value={itens?.statusIten}
            required
          >
            <option defaultValue={0}>Selecione o status</option>
            <option value="1">Ativo</option>
            <option value="0">Desativo</option>
          </select>
        </div>
        <BtnForm title="Alterar" />
      </form>
    </div>
  )
}
