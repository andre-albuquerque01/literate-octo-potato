import { GetAllCategory } from '@/actions/category/getAllCatgeory'
import { CategoryListComponent } from '@/components/categoryList'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function GetAll() {
  const data = await GetAllCategory()
  return (
    <div className="flex flex-col min-h-[90%] w-full px-3">
      <Link
        href="/user"
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
      <CategoryListComponent data={data} />
    </div>
  )
}
