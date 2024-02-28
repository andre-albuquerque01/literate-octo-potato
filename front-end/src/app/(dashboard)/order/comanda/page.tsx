import { ListItens } from '@/components/ListItens'
import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'

export default function Comanda() {
  return (
    <div className="w-full">
      <div className="max-md:w-[80%] max-md:mx-auto md:mt-4">
        <Link href="" className="flex items-center py-4 md:hidden">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <h1 className="text-2xl">Comanda da mesa 1</h1>
        <div className="flex flex-wrap max-md:justify-center gap-5">
          <ListItens
            href=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            alt="image"
            width={150}
            height={150}
            title="Churrasco"
            value={10}
          />
          <ListItens
            href=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            alt="image"
            width={150}
            height={150}
            title="Churrasco"
            value={10}
          />
          <ListItens
            href=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            alt="image"
            width={150}
            height={150}
            title="Churrasco"
            value={10}
          />
        </div>
        <div className="flex items-center gap-2 opacity-70 justify-center mt-5">
          <Plus className="w-5 h-5 border border-black rounded-full" />
          <span>Adicionar mais itens.</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border border-zinc-500 fixed bottom-0 max-md:z-30 px-4 md:py-5 max-md:bg-white max-md:w-full md:mb-5 md:w-[40%] space-y-1 md:rounded-xl">
          <div className="flex justify-between">
            <span className="font-medium">Data</span>
            <span>12/12/2012</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Mesa</span>
            <span>12</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Preço</span>
            <span>R$ 12</span>
          </div>
          <div className="flex justify-center">
            <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-1 hover:bg-red-500">
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
