import { GetAllCategory } from '@/app/actions/category/getAllCatgeory'
import { CategorySearch } from '@/components/categorySearch'
import { FormSearch } from '@/components/form-search'
import { CategoryInterface } from '@/data/type/category'
import { Suspense } from 'react'

export default async function SearchIten() {
  const reqBody = await GetAllCategory()
  const data = reqBody.data

  return (
    <div className="max-md:w-[390px] mx-auto space-y-5">
      <Suspense fallback={'Carregando...'}>
        <FormSearch />
        <div className="space-y-3">
          <h1 className="font-normal text-[20px]">Categorias</h1>
          <div className="max-md:space-y-[19px] md:flex w-full flex-wrap gap-6 ">
            {data &&
              data.length > 0 &&
              data.map((category: CategoryInterface, index: number) => (
                <CategorySearch
                  key={index}
                  path={`/itens/search/itens?c=${category.typeCategory.toLowerCase()}`}
                  src={category.urlImageCategory ?? ''}
                  alt={`Imagem de fundo de ${category.typeCategory}`}
                  title={category.typeCategory}
                />
              ))}
          </div>
        </div>
      </Suspense>
    </div>
  )
}
