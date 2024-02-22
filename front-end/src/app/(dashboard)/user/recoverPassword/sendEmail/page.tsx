import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SendEmail() {
  return (
    <div className="flex flex-col mx-auto justify-center h-screen w-full items-center">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Recuperar senha</p>
      <p className="text-sm w-96 max-md:w-80 text-justify py-3">
        Enviaremos um email para o endereço fornecido com as instruções
        necessárias para recuperação de senha. Por favor, verifique sua caixa de
        entrada e também a pasta de spam, caso não encontre o email em sua caixa
        principal.
      </p>
      <form className="w-96 max-md:w-80">
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            E-mail: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-9 border border-zinc-400 rounded-[5px] px-2"
            required
          />
        </div>
        <BtnForm title="Recuperar" />
      </form>
    </div>
  )
}
