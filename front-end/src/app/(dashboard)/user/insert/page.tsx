import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function InsertUser() {
  return (
    <div className="flex flex-col mx-auto justify-center h-screen w-full items-center">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="firstName">
            Primeiro nome: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="lastName">
            Sobrenome: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="DDD">
            DDD: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="number"
            name="DDD"
            id="DDD"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="phoneNumber">
            Número de telefone: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="cpf">
            CPF: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="number"
            name="cpf"
            id="cpf"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            E-mail: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
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
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="password_confirmation">
            Repetir senha: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <div className="flex flex-row gap-2 mt-3 items-center">
          <input type="checkbox" name="term_aceite" id="term_aceite" required />
          <Link href="">
            Termos de aceitação <span className="text-red-600">*</span>
          </Link>
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
