import { ArrowLeft, ThumbsDown, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Iten({ params }: { params: { id: string } }) {
  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center  md:mt-8">
      <Link href="" className="flex items-center px-8 py-4 md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <Image
        src={
          'https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg'
        }
        width={100}
        height={100}
        alt="imagem do item"
        className="max-md:w-full max-md:object-cover md:w-96 md:h-64 md:object-fill"
      />
      <div className="max-md:p-8 space-y-3 md:mt-3">
        <h1 className="font-bold text-2xl">Churrasco</h1>
        <h5 className="text-md md:w-96 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus ullam eum, ab iusto quis optio, est, ut mollitia nisi
          veniam repellendus aspernatur distinctio ea consequatur odio
          recusandae! Optio, molestias mollitia!
        </h5>
        <p className="text-lg font-medium">R$ 10</p>
        <p className="text-md font-normal">
          <span className="font-medium">Tempo de espera:</span> 10 - 20 min{' '}
        </p>
        <p className="text-md font-normal">
          <span className="font-medium">Avaliações:</span> 10 pessoas Gostaram
        </p>
        <div className="space-y-2">
          <p className="text-md font-medium">Avaliar</p>
          <p className="flex gap-4">
            <ThumbsUp className="w-6 h-6" />
            <ThumbsDown className="w-6 h-6" />
          </p>
        </div>
      </div>
    </div>
  )
}
