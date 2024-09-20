'use client'
import GetIdMenuService from '@/actions/menu/getIdMenu'
import { UpdateMenu } from '@/actions/menu/updateMenu'
import GetAllTableService from '@/actions/table/getAllTable'
import Loading from '@/app/loading'
import { TableInterface } from '@/data/type/table'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import ReactInputMask from 'react-input-mask-next'

const BtnForm = ({ pending }: { pending: boolean }) => {
  return (
    <>
      {pending ? (
        <div className="flex justify-center">
          <button
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            disabled={pending}
          >
            Alterando...
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
            Alterar
          </button>
        </div>
      )}
    </>
  )
}

export default function UpdateOrder({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<boolean>(false)
  const [returnError, setReturnError] = useState<string>('')
  const [table, setTable] = useState<TableInterface[]>([])
  const router = useRouter()
  const [data, setData] = useState({
    idMesa: '',
    cpf: '',
  })

  useEffect(() => {
    const handleMesa = async () => {
      const dt = await GetAllTableService()
      setTable(dt)
    }

    const hanldeData = async (id: string) => {
      const dt = await GetIdMenuService(id)
      setData(dt)
    }

    handleMesa()
    hanldeData(params.id)
  }, [params.id])

  const handleData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(true)
    const req = await UpdateMenu(data, params.id)
    if (req === 'success') {
      setStatus(false)
      alert('Alteração feita com sucesso.')
      router.push('/menu/list')
    } else {
      setStatus(false)
      setReturnError(req)
    }
    setStatus(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="flex flex-col mx-auto justify-center md:h-screen  md:mt-[-125px] w-full items-center">
      <Suspense fallback={<Loading />}>
        <>
          <Link
            href="/menu/list"
            className="flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-4 max-md:w-80"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">
            Alterar o menu
          </p>
          <form onSubmit={handleData}>
            <div className="flex flex-col mt-3">
              <label htmlFor="cpf">
                CPF do cliente: <span className="text-red-600">*</span>{' '}
              </label>
              <ReactInputMask
                mask="999.999.999-99"
                name="cpf"
                id="cpf"
                className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
                value={data.cpf ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="idMesa">
                Mesa: <span className="text-red-600">*</span>{' '}
              </label>
              <select
                name="idMesa"
                id="idMesa"
                className="w-96 h-9 border border-zinc-400 bg-white rounded-[5px] max-md:w-80 px-2 uppercase"
                value={data.idMesa}
                onChange={handleChange}
                required
              >
                <option defaultValue={0}>Selecione a mesa</option>
                {table.map((mesa, key) => (
                  <option value={mesa.idMesa} key={key}>
                    Número: {mesa.numberMesa} && Status:{' '}
                    {mesa.statusMesa === 1 ? 'Ocupada' : 'Vazia'}
                  </option>
                ))}
              </select>
            </div>

            {returnError && (
              <span className="text-xs text-red-600">{returnError}</span>
            )}
            <BtnForm pending={status} />
          </form>
        </>
      </Suspense>
    </div>
  )
}
