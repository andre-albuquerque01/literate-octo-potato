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

interface LunchCarrosselProps {
  data: InterfaceItens[]
}

export const DrinksCarrossel = ({ data }: LunchCarrosselProps) => {
  const [qtdCarousel, setQtdCarousel] = useState<number>(4)
  const [between, setBetween] = useState<number>(20)

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      if (width < 620) {
        setQtdCarousel(3)
        setBetween(60)
      } else if (width < 890) {
        setQtdCarousel(4)
        setBetween(50)
      } else if (width < 920) {
        setQtdCarousel(5)
        setBetween(40)
      } else if (width < 1100) {
        setQtdCarousel(6)
        setBetween(30)
      } else if (width < 1330) {
        setQtdCarousel(7)
        setBetween(30)
      } else {
        setQtdCarousel(8)
        setBetween(20)
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
        href={`/itens/search/itens?c=bebidas`}
        className="flex items-center py-2 text-lg mt-3"
      >
        Bebidas <ArrowRight className="w-5 h-5" />
      </Link>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={between}
        slidesPerView={qtdCarousel}
      >
        {data &&
          data.length > 0 &&
          data.map(
            (itens, key) =>
              itens.category.typeCategory === 'bebidas' &&
              itens.position === 'entrada' && (
                <SwiperSlide key={key}>
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
              ),
          )}
      </Swiper>
    </div>
  )
}
