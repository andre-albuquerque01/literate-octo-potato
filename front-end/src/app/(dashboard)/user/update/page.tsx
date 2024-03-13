'use client'
import { BtnForm } from '@/components/btnForm'
import Api from '@/data/api'
import { UserInterface } from '@/data/type/user'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

async function putInsert(body: object) {
  try {
    const response = await Api('/user/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const reqBody = await response.json()
    return reqBody.data
  } catch (error) {
    console.error(error)
  }
}

async function getUser() {
  try {
    const response = await Api('/user/show', {
      method: 'GET',
      cache: 'no-cache',
    })
    const reqBody = await response.json()
    if (response.ok) return reqBody.data.data
  } catch (error) {
    console.error(error)
  }
}

export default function UpdateUser() {
  const [returnError, setReturnError] = useState<string>('')
  const [data, setData] = useState<UserInterface>()

  useEffect(() => {
    const get = async () => {
      const date = await getUser()
      setData(date)
    }
    get()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await putInsert(data)
    setReturnError(req.message)

    if (req.message)
      if (req.message.includes('The cpf has already been taken.')) {
        setReturnError('The cpf has already been taken.')
      } else if (req.message === 'sucess') {
        alert('Cadastro alterado com sucesso!')
        window.history.back()
      }
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
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-3 max-md:mt-3">
          <label htmlFor="firstName">
            Primeiro nome: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.firstName ?? ''}
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
            defaultValue={data?.lastName ?? ''}
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
            min="0"
            maxLength={999}
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.DDD ?? ''}
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
            min={9999}
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.phoneNumber ?? ''}
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
            min={9999}
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.cpf ?? ''}
            readOnly
            required
          />
        </div>
        {returnError === 'The cpf has already been taken.' && (
          <span className="text-xs text-red-600">CPF já cadastrado</span>
        )}
        <div className="flex flex-col mt-3">
          <label htmlFor="email">
            E-mail: <span className="text-red-600">*</span>{' '}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
            defaultValue={data?.email ?? ''}
            readOnly
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
        <BtnForm title="Cadastrar" />
      </form>
    </div>
  )
}
