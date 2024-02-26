import Image from 'next/image'
import Link from 'next/link'

interface TypeSearch {
  href: string
  src: string
  alt: string
  width: number
  height: number
  title: string
  value: number
  waitTime?: string
}

export const ListItens = (search: TypeSearch) => {
  return (
    <Link href={search.href} className="flex gap-4 shadow-xl p-5">
      <Image
        src={search.src}
        alt={search.alt}
        width={search.width}
        height={search.height}
        className="rounded-lg"
      />
      <div className="flex flex-col justify-evenly">
        <p className="font-medium text-lg truncate">{search.title}</p>
        <p className="font-medium text-md">
          {search.value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="font-medium text-md truncate">{search.waitTime}</p>
      </div>
    </Link>
  )
}
