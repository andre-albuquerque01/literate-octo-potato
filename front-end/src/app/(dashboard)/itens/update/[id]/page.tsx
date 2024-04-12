'use client'
import { GetAllCategory } from '@/app/actions/category/getAllCatgeory'
import { GetIdItens } from '@/app/actions/itens/getIdItens'
import { UpdateItens } from '@/app/actions/itens/updateItens'
import { BtnForm } from '@/components/btnForm'
import { CategoryInterface } from '@/data/type/category'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function UpdateItensPage({
  params,
}: {
  params: { id: number }
}) {
  const router = useRouter()
  const [category, setCategory] = useState<CategoryInterface[]>([])
  const [itens, setItens] = useState({
    title: '',
    desc: '',
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
      const reqBody = await GetAllCategory()
      const data = reqBody.data
      setCategory(data)
    }
    handleCategory()

    const handleItens = async () => {
      const reqBody = await GetIdItens(params.id)
      const item = reqBody.data
      setItens(item)
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

    const req = await UpdateItens(itens, params.id)

    if (req) {
      alert('Item alterado')
      router.back()
    } else {
      alert('Não foi possívle ser alterado!')
    }
  }

  return (
    <div className="flex flex-col mx-auto items-center h-[90%] max-md:min-h-[100%] max-md:max-h-[150%] md:mt-5 w-full">
      {itens.title !== undefined ? (
        <>
          <Link
            href="/itens/list"
            className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-10 max-md:w-80"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
            Alterar item
          </p>
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
                defaultValue={itens?.title ?? ''}
                onChange={handleChange}
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
                defaultValue={itens?.desc ?? ''}
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
                <option value="">Selecione a categoria</option>
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
                <option value="">Selecione a posição</option>
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
                <option value="">Selecione o status</option>
                <option value="1">Ativo</option>
                <option value="0">Desativo</option>
              </select>
            </div>
            <BtnForm title="Alterar" />
          </form>
        </>
      ) : (
        <h1>Item não encontrado!</h1>
      )}
    </div>
  )
}
