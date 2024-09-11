import { InterfaceItens } from '@/data/type/interfaceItens'
import Image from 'next/image'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'

export const SwiperSlideComponent = ({ itens }: { itens: InterfaceItens }) => {
  return (
    <SwiperSlide>
      <div className="w-32">
        <Link href={`/itens/${itens.idItens}`}>
          <Image
            src={itens.urlImage}
            width={160}
            height={160}
            alt={`Imagem do item ${itens.title}`}
            className="max-w-32 max-h-32 w-auto h-auto min-h-24 min-w-24 object-cover rounded-md"
          />
          <div className="">
            <p className="text-md text-zinc-900 font-medium truncate max-w-32">
              {itens.title}aaaaaaaaa
            </p>
            <span className="text-zinc-900 flex font-medium">
              {itens.value.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </Link>
      </div>
    </SwiperSlide>
  )
}
