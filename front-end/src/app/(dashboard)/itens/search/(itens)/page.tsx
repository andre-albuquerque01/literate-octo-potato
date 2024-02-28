import { CategorySearch } from '@/components/categorySearch'
import { FormSearch } from '@/components/form-search'

export default function SearchIten() {
  return (
    <div className="max-md:w-[320px] mx-auto space-y-5">
      <FormSearch />
      <div className="space-y-3">
        <h1 className="font-normal text-[20px]">Categorias</h1>
        <div className="max-md:space-y-[19px] md:flex w-full flex-wrap gap-6 ">
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2020/05/17/14/15/bean-stew-5181818_1280.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Promoções"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2020/03/25/21/05/pizza-4968645_640.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Pizza"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_640.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Sobremesa"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2015/10/24/11/09/red-wine-1004255_640.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Bebidas"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Lanches"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Almoço"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_640.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Jantas"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2016/05/21/14/04/food-1406879_1280.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Sushi"
          />
          <CategorySearch
            path=""
            src="https://cdn.pixabay.com/photo/2012/10/26/02/14/crab-63084_640.jpg"
            width={384}
            height={40}
            alt="Imagem de fundo"
            title="Frutos do mar"
          />
        </div>
      </div>
    </div>
  )
}
