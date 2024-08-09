'use client'
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InterfaceItens } from '@/data/type/interfaceItens'

interface DinnerCarrosselProps {
  data: InterfaceItens[]
}

export const DinnerCarrossel = ({ data }: DinnerCarrosselProps) => {
  const [qtdCarousel, setQtdCarousel] = useState<number>(4)

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      if (width < 620) {
        setQtdCarousel(3)
      } else if (width < 890) {
        setQtdCarousel(4)
      } else if (width < 920) {
        setQtdCarousel(5)
      } else if (width < 1100) {
        setQtdCarousel(6)
      } else if (width < 1330) {
        setQtdCarousel(7)
      } else {
        setQtdCarousel(11)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="pl-2">
      <Link
        href={`/itens/search/itens?c=jantas`}
        className="flex items-center py-2 text-lg mt-3"
      >
        Jantas <ArrowRight className="w-5 h-5" />
      </Link>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={30}
        slidesPerView={qtdCarousel}
      >
        {data.map(
          (itens, key) =>
            itens.category.typeCategory === 'jantas' &&
            itens.position === 'entrada' && (
              <SwiperSlide key={key}>
                <div>
                  <Link href={`/itens/${itens.idItens}`}>
                    <Image
                      src={itens.urlImage}
                      width={100}
                      height={100}
                      alt={`Imagem do item ${itens.title}`}
                      className="w-[120px] h-[120px] object-contain"
                    />
                    <div>
                      <span className="text-md text-wrap text-zinc-900 font-medium">
                        {itens.title}
                      </span>
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
            ),
        )}
      </Swiper>
    </div>
  )
}
