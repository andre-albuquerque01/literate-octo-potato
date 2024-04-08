import { GetIdItens } from '@/app/actions/itens/getIdItens'
import { GetIdItensRate } from '@/app/actions/itens/rate/rateIdItens'
import { BtnLike } from '@/components/btnLike'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Iten({ params }: { params: { id: number } }) {
  const reqBody = await GetIdItens(params.id)
  const data = reqBody.data
  const reqRate = await GetIdItensRate(params.id)
  const rate = reqRate.data

  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center  md:mt-8">
      {!data ? (
        <>
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
            <h1 className="font-bold text-2xl uppercase">{data.title}</h1>
            <h5 className="text-md md:w-96 text-justify">{data.desc}</h5>
            <p className="text-lg font-medium">
              {data.value.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-md font-normal">
              <span className="font-medium">Tempo de espera:</span>{' '}
              <span>{data.waitTime}.</span>
            </p>
            {rate[0]?.count > 0 && (
              <p className="text-md font-normal">
                <span className="font-medium">Avaliações:</span> {rate[0].count}{' '}
                pessoas gostaram.
              </p>
            )}
            <BtnLike id={data.idItens} />
          </div>
        </>
      ) : (
        <h1>Item não encontrado</h1>
      )}
    </div>
  )
}
