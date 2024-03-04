import Api from '@/data/api'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function getIten(id: number) {
  try {
    const request = await Api(`/itens/id/${id}`, { next: { revalidate: 60 } })
    const reqJson = await request.json()
    if (request.ok) return reqJson
    // eslint-disable-next-line no-unused-expressions
    else []
  } catch (error) {
    console.error(error)
  }
}

async function rateItens(id: number) {
  try {
    const request = await Api(`/itens/rate/${id}`, { next: { revalidate: 60 } })
    const reqJson = await request.json()
    if (request.ok) return reqJson
    // eslint-disable-next-line no-unused-expressions
    else []
  } catch (error) {
    console.error(error)
  }
}

export default async function Iten({ params }: { params: { id: number } }) {
  const data = await getIten(params.id)
  const rate = await rateItens(params.id)
  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center  md:mt-8">
      <Link href="" className="flex items-center px-8 py-4 md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <Image
        src={data.urlImage}
        width={100}
        height={100}
        alt="imagem do item"
        className="max-md:w-full max-md:object-cover md:w-96 md:h-64 md:object-fill"
      />
      <div className="max-md:p-8 space-y-3 md:mt-3">
        <h1 className="font-bold text-2xl">{data.title}</h1>
        <h5 className="text-md md:w-96 text-justify">{data.desc}</h5>
        <p className="text-lg font-medium">{data.value}</p>
        <p className="text-md font-normal">
          <span className="font-medium">Tempo de espera:</span>{' '}
          <span>{data.waitTime}</span>
        </p>
        <p className="text-md font-normal">
          <span className="font-medium">Avaliações:</span> {rate?.count} pessoas
          gostaram
        </p>
        {/* <div className="space-y-2">
          <p className="text-md font-medium">Avaliar</p>
          <p className="flex gap-4">
            <ThumbsUp className="w-6 h-6" />
            <ThumbsDown className="w-6 h-6" />
          </p>
        </div> */}
      </div>
    </div>
  )
}
