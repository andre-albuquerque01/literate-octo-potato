'use client'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'

import { InterfaceItens } from '@/data/type/interfaceItens'

interface CarrosselProps {
  data: InterfaceItens[]
}

export const Carrossel = ({ data }: CarrosselProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={false}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={true}
      className="md:w-[80%] md:h-[350px] max-md:h-[260px] md:rounded-xl mt-5"
    >
      {data &&
        data.length > 0 &&
        data.map(
          (itens, key) =>
            itens.position === 'carrossel' && (
              <SwiperSlide key={key}>
                <Link href={`/itens/${itens.idItens}`}>
                  <div className="">
                    <Image
                      src={itens.urlImage}
                      width={320}
                      height={320}
                      alt={`Image do ${itens.title}`}
                      className="object-fill h-full mx-auto w-full relative"
                      priority
                      sizes="100vw"
                    />
                    <div className="absolute bottom-10 right-5 h-12 flex items-center gap-2 max-w-[250px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
                      <span className="text-md truncate text-white font-semibold">
                        {itens.title}
                      </span>
                      <span className="text-slate-200 flex h-full items-center justify-center rounded-full bg-red-500 px-4 font-semibold">
                        {itens.value.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ),
        )}
    </Swiper>
  )
}
