import { BtnForm } from '@/components/btnForm'
import { ArrowLeft, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AddCart() {
  return (
    <div className="max-md:w-[360px] mx-auto mt-5 space-y-5">
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
      <Link href="" className="flex items-center  md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <p className="text-md font-normal">Adicionar na comanda</p>
      <div className="flex flex-wrap gap-5 w-[350px]">
        <div className="flex justify-between gap-4 max-md:w-full shadow-xl p-4 border border-zinc-200 rounded-lg">
          <div className="flex gap-3">
            <Image
              src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
              alt="image"
              width={150}
              height={150}
              className="rounded-lg"
            />
            <div className="flex flex-col justify-evenly">
              <p className="font-medium text-lg truncate">Pão</p>
              <p className="font-medium text-md">R$ 12</p>
            </div>
          </div>
          <div title="adicionar item" className="">
            <Plus className="w-5 h-5 rounded-full border border-zinc-800 hover:bg-zinc-700 hover:text-white" />
          </div>
        </div>
      </div>
      <div>
        <BtnForm title="Adicionar" />
      </div>
    </div>
  )
}
