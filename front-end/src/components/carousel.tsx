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

export const Carrossel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      loop={true}
      pagination={{ clickable: true }}
      autoplay={true}
      className="md:w-[80%] md:h-[350px] max-md:h-[260px] md:rounded-xl mt-5"
    >
      <SwiperSlide>
        <Link href="">
          <div className="">
            <Image
              src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
              width={320}
              height={320}
              alt="imagem do item"
              className="object-fill h-full mx-auto w-full relative"
            />
            <div className="absolute bottom-10 right-5 h-12 flex items-center gap-2 max-w-[230px] rounded-full border-2 border-zinc-500 bg-black/80 p-1 pl-5">
              <span className="text-md truncate text-white font-semibold">
                Churrasco
              </span>
              <span className="text-slate-200 flex h-full items-center justify-center rounded-full bg-red-500 px-4 font-semibold">
                R$ 10
              </span>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  )
}
