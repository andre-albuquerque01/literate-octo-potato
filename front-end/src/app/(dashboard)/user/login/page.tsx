import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="flex flex-col mx-auto justify-center h-screen w-full items-center">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Login</p>
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
        <div className="flex flex-col mt-3">
          <label htmlFor="password">
            Senha: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full h-9 border border-zinc-400 rounded-[5px] px-2"
            required
          />
        </div>
        <Link
          href=""
          className="flex flex-row gap-2 mt-3 items-center text-xs hover:text-zinc-600"
        >
          Esquece a senha?
        </Link>
        <BtnForm title="Entrar" />
      </form>
      <div className="w-80 max-md:w-64 mt-5 max-md:mt-2 h-[0.5px] bg-black"></div>
      <Link
        href="/user/insert"
        className="text-xs mt-3 max-md:mt-2 hover:text-zinc-600"
      >
        Não tem cadastro? Clique para cadastrar
      </Link>
    </div>
  )
}
