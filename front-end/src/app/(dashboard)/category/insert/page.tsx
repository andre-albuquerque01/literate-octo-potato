import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function InsertCategory() {
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
        Cadastro de categoria
      </p>
      <form>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="typeCategory">
            Nome da categoria: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="typeCategory"
            id="typeCategory"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="urlImageCategory">
            Imagem de fundo da categoria:{' '}
            <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="urlImageCategory"
            id="urlImageCategory"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
          />
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
