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
    <Link
      href={search.href}
      className="flex gap-3 max-md:w-full max-h-36 md:w-[360px] max-w-96 shadow-xl p-2 border md:min-w-[320px] border-zinc-200 rounded-lg"
    >
      <Image
        src={search.src}
        alt={search.alt}
        width={search.width}
        height={search.height}
        className="rounded-lg w-[150px] h-[115px]"
      />
      <div className="flex flex-col justify-evenly w-[150px]">
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
