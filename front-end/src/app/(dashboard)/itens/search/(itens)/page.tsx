import { CategorySearch } from '@/components/categorySearch'
import { FormSearch } from '@/components/form-search'
import Api from '@/data/api'
import { CategoryInterface } from '@/data/type/category'

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

export default async function SearchIten() {
  const data = await getCategory()

  return (
    <div className="max-md:w-[390px] mx-auto space-y-5">
      <FormSearch />
      <div className="space-y-3">
        <h1 className="font-normal text-[20px]">Categorias</h1>
        <div className="max-md:space-y-[19px] md:flex w-full flex-wrap gap-6 ">
          {data.map((category, index) => (
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
    </div>
  )
}
