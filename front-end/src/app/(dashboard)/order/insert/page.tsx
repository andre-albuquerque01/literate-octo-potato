import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function InsertOrder() {
  return (
    <div className="flex flex-col mx-auto justify-center h-screen w-full items-center">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro do pedido
      </p>
      <form>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="idMenu">
            Qual mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="idMenu"
            id="idMenu"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="idItens">
            Qual item: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="idItens"
            id="idItens"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="qtdOrder">
            Quantos itens: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="qtdOrder"
            id="qtdOrder"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
