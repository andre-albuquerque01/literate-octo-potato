import Image from 'next/image'
import Link from 'next/link'

interface TypeCategory {
  path: string
  src: string
  width: number
  height: number
  alt: string
  title: string
}

export const CategorySearch = (category: TypeCategory) => {
  return (
    <div className="relative w-80 h-11 md:w-[32%]">
      <Link href={category.path}>
        <Image
          src={category.src}
          width={category.width}
          height={category.height}
          alt={category.alt}
          className="absolute w-full h-full object-cover rounded-xl"
        />
        <span className="absolute top-0 left-5 right-0 bottom-0 flex items-center justify-start text-slate-50 font-normal">
          {category.title}
        </span>
      </Link>
    </div>
  )
}
