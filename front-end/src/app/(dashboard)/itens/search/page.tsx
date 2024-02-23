import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchIten() {
  return (
    <div className="max-md:w-[320px] mx-auto space-y-5">
      <form className="flex items-center gap-3 w-full rounded-xl px-5 py-3 border border-slate-400 md:mt-7 ">
        <Search className="w-5 h-5" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar item"
          className="flex-1 bg-transparent text-sm outline-none "
        />
      </form>
      <div className="space-y-3">
        <h1 className="font-normal text-[20px]">Categorias</h1>
        <div className="space-y-[19px]">
          <div className="relative w-80 h-11">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2020/05/17/14/15/bean-stew-5181818_1280.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Promoções
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2020/03/25/21/05/pizza-4968645_640.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Pizza
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_640.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Sobremesa
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/24/11/09/red-wine-1004255_640.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Bebidas
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Lanches
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Almoço
              </span>
            </Link>
          </div>
          <div className="relative w-80 h-10">
            <Link href="">
              <Image
                src="https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_640.jpg"
                width={384}
                height={40}
                alt="Imagem de fundo"
                className="absolute w-full h-full object-cover rounded-xl"
              />
              <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
                Jantas
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
