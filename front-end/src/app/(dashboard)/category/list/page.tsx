import { RemoveCategory } from '@/components/removeCategory'
import Api from '@/data/api'
import { CategoryInterface } from '@/data/type/category'
import { ArrowLeft, Edit, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

async function getAll(): Promise<CategoryInterface[]> {
  try {
    const request = await Api('/category/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const reqJson = await request.json()
    return reqJson.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function GetAll() {
  const data = await getAll()

  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <Link
        href="/category/insert"
        className="flex items-center gap-2 w-[170px] py-2 text-sm max-md:mb-0 max-md:w-80 mt-3 border-b-2 border-transparent hover:border-red-600 transition duration-500"
      >
        <PlusCircle className="w-5 h-5" />
        Adicionar categoria
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Lista de categorias cadastradas
      </p>
      <div className="space-y-5 mt-4">
        {data.map((category, key) => (
          <div className="" key={key}>
            <div className="flex mx-auto justify-between">
              <span className="max-w-96">{category.typeCategory}</span>
              <span className="max-md:hidden truncate w-96 text-center">
                {category.urlImageCategory ?? 'Sem imagem'}
              </span>
              <div className="flex items-center gap-3">
                <RemoveCategory id={category.idCategory} />
                <Link
                  href={`/category/update/${category.idCategory}`}
                  title={`Editar o item, ${category.typeCategory}`}
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <Link
                  href={`/category/update/${category.idCategory}`}
                  title={`Excluir o item, ${category.typeCategory}`}
                >
                  <Trash2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="w-full h-[1px] bg-zinc-600"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
