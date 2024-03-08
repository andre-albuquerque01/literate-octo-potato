'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'

async function postInsert(body: object) {
  try {
    const request = await Api('category/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json',
      },
      body: JSON.stringify(body),
    })
    const reqJson = await request.json()
    return reqJson
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default function InsertCategory() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await postInsert(data)
    console.log(req)
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro de categoria
      </p>
      <form onSubmit={handleSubmit}>
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
            Imagem de fundo da categoria:
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
