'use client'
import { GetIdTableService } from '@/actions/table/getIdTable'
import { UpdateTable } from '@/actions/table/updateTable'
import { BtnForm } from '@/components/buttons/btnForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'

export default function UpdateTablePage({
  params,
}: {
  params: { id: string }
}) {
  const [returnError, setReturnError] = useState<string>('')
  const [data, setData] = useState({
    lotacao: '',
    numberMesa: '',
    statusMesa: '',
  })
  const router = useRouter()

  useEffect(() => {
    const handleId = async (id: string) => {
      const dt = await GetIdTableService(id)
      setData(dt)
    }
    handleId(params.id)
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const req = await UpdateTable(data, params.id)

    if (req === 'success') {
      alert('Alterado com sucesso!')
      router.back()
    } else {
      setReturnError(req)
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center md:min-h-screen md:mt-[-100px] w-full items-center">
      <Link
        href="/table/list"
        className="flex items-center gap-1 text-sm w-96 max-md:mt-5 max-md:w-80 mb-5"
      >
        <ArrowLeft className="w-5 h-4" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Alterar mesa</p>
      <Suspense>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-3 max-md:mt-3">
            <label htmlFor="numberMesa">
              Número da mesa: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="numberMesa"
              id="numberMesa"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              defaultValue={data?.numberMesa ?? ''}
              onChange={handleChange}
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
              defaultValue={data?.lotacao ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="statusMesa">
              Status inicial da mesa: <span className="text-red-600">*</span>{' '}
            </label>
            <select
              name="statusMesa"
              id="statusMesa"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2 uppercase"
              value={data?.statusMesa ?? ''}
              onChange={handleChange}
              required
            >
              <option>Selecione o status</option>
              <option value="1">Ativa</option>
              <option value="0">Desativa</option>
            </select>
          </div>
          <BtnForm title="Alterar" />
        </form>
      </Suspense>
    </div>
  )
}
