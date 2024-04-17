'use client'
import { InsertTable } from '@/app/actions/table/insertTable'
import { BtnForm } from '@/components/btnForm'
import { ValidateFormTable } from '@/data/function/validateFormTable'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function InsertTablePage() {
  const [returnError, setReturnError] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const val = ValidateFormTable(
      e.currentTarget.numberMesa.value,
      e.currentTarget.lotacao.value,
    )

    if (val !== '') setReturnError(val)

    const req = await InsertTable(data)

    if (req.message === 'sucess') {
      alert('Cadastrado com sucesso!')
      window.history.back()
    } else if (req.message === 'The number mesa has already been taken.') {
      setReturnError('Número da mesa já cadastrado!')
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[800px] w-full items-center">
      <Link
        href="/table/list"
        className="md:hidden flex items-center w-80 mb-5 mx-auto"
      >
        <ArrowLeft className="w-5 h-4" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
        Cadastro da mesa
      </p>
      <form onSubmit={handleSubmit}>
        {returnError === 'Preencha os dados!' && (
          <span className="text-xs text-red-600">Preencha os dados!</span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="numberMesa">
            Número da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="numberMesa"
            id="numberMesa"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        {returnError === 'Número da mesa já cadastrado!' && (
          <span className="text-xs text-red-600">
            Número da mesa já cadastrado!
          </span>
        )}
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="lotacao">
            Capacidade da mesa: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="lotacao"
            id="lotacao"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            required
          />
        </div>
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
