import Link from 'next/link'

interface PropsPagination {
  query: number
  countPage: number
  path: string
  letter: string
}

export default function LinkPaginationQuery({
  query,
  path,
  countPage,
  letter,
}: PropsPagination) {
  return (
    <>
      {query > 1 && (
        <Link
          href={`?${letter}=${path}&page=${query - 1}`}
          className="border border-zinc-800 text-black py-2 px-4 mr-2 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
        >
          Anterior
        </Link>
      )}
      {query < countPage && (
        <Link
          href={`?${letter}=${path}&page=${Number(query) + 1}`}
          className="border border-zinc-800 text-black py-2 px-4 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
        >
          Próxima
        </Link>
      )}
    </>
  )
}
