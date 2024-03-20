import { AddCartComanda } from '@/components/addCart'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'
import { ArrowLeft, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function getItens(): Promise<InterfaceItens[]> {
  try {
    const request = await Api('/itens/home', {
      next: {
        revalidate: 30,
      },
    })
    const reqBody = await request.json()
    return reqBody.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function AddCart() {
  const data = await getItens()

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
      <div className="flex flex-wrap gap-5">
        {data.map((itens, index) => (
          <div
            className="flex justify-between gap-3 max-md:w-full shadow-xl p-2 border md:min-w-[320px] border-zinc-200 rounded-lg"
            key={index}
          >
            <div className="flex gap-3">
              <Image
                src={itens.urlImage}
                alt={`Imagem do ${itens.title}`}
                width={150}
                height={150}
                className="rounded-lg"
              />
              <div className="flex flex-col justify-evenly">
                <p className="font-medium text-lg truncate">{itens.title}</p>
                <p className="font-medium text-md">
                  {itens.value.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <AddCartComanda id={itens.idItens} />
          </div>
        ))}
      </div>
      <div>
        <BtnForm title="Adicionar" />
      </div>
    </div>
  )
}
