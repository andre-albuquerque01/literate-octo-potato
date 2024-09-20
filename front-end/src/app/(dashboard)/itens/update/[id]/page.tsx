'use client'
import { GetAllCategory } from '@/actions/category/getAllCatgeory'
import { GetIdItens } from '@/actions/itens/getIdItens'
import { UpdateItens } from '@/actions/itens/updateItens'
import { CategoryInterface } from '@/data/type/category'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

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

export default function UpdateItensPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [status, setStatus] = useState<boolean>(false)
  const [returnError, setReturnError] = useState<string>('')
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [itens, setItens] = useState({
    title: '',
    description: '',
    value: '',
    statusIten: '',
    qtdIten: '',
    urlImage: '',
    waitTime: '',
    typeCategory: '',
    idCategory: '',
    position: '',
  })

  useEffect(() => {
    const handleCategory = async () => {
      const dt = await GetAllCategory()
      setCategory(dt)
    }
    handleCategory()

    const handleItens = async () => {
      const dt = await GetIdItens(params.id)
      setItens(dt)
    }
    handleItens()
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setItens((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function handleSubmite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const req = await UpdateItens(itens, params.id)

    if (req === 'success') {
      setStatus(false)
      alert('Item alterado!')
      router.back()
    } else {
      setStatus(false)
      setReturnError(req)
    }
    setStatus(false)
  }

  return (
    <div className="flex flex-col mx-auto justify-center min-h-screen md:mt-[-100px] w-full items-center">
      <Link
        href="/itens/list"
        className="flex items-center gap-1 text-sm w-96 md:mt-16 mt-5 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Alterar item</p>
      <form onSubmit={handleSubmite}>
        {returnError && (
          <span className="text-xs text-red-600">{returnError}</span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="title">
            Titulo: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={itens?.title ?? ''}
            onChange={handleChange}
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
            defaultValue={itens?.description ?? ''}
            onChange={handleChange}
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
            defaultValue={itens?.value ?? ''}
            onChange={handleChange}
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
            defaultValue={itens?.qtdIten ?? ''}
            onChange={handleChange}
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
            defaultValue={itens?.urlImage ?? ''}
            onChange={handleChange}
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
            defaultValue={itens?.waitTime ?? ''}
            onChange={handleChange}
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
            onChange={handleChange}
            required
          >
            <option disabled>Selecione a categoria</option>
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
            onChange={handleChange}
            required
          >
            <option disabled>Selecione a posição</option>
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
            onChange={handleChange}
            required
          >
            <option disabled>Selecione o status</option>
            <option value="1">Ativo</option>
            <option value="0">Desativo</option>
          </select>
        </div>
        <BtnForm pending={status} />
      </form>
    </div>
  )
}
