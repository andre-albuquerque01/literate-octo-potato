import Link from 'next/link'
import { CategoryInterface } from '@/data/type/category'
import { Edit } from 'lucide-react'
import { RemoveCategory } from './removeCategory'

export const CategoryListComponent = ({
  data,
}: {
  data: CategoryInterface[]
}) => {
  return (
    <div className="space-y-5 mt-4">
      {data &&
        data.length > 0 &&
        data.map((category, key) => (
          <div className="p-4 bg-white shadow rounded-lg" key={key}>
            <div className="flex justify-between items-center">
              <span className="max-w-96">{category.typeCategory}</span>
              <span className="max-md:hidden truncate w-96 text-center">
                {category.urlImageCategory ?? 'Sem imagem'}
              </span>
              <div className="flex items-center gap-3">
                <Link href={`/category/update/${category.idCategory}`} passHref>
                  <span title={`Editar o item, ${category.typeCategory}`}>
                    <Edit className="w-5 h-5" />
                  </span>
                </Link>
                <RemoveCategory id={category.idCategory} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
