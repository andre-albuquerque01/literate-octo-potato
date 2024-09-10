import Link from 'next/link'

interface PropsPagination {
  query: number
  countPage: number
}

export default function LinkPagination({ query, countPage }: PropsPagination) {
  return (
    <>
      {query > 1 && (
        <Link
          href={`?page=${query - 1}`}
          className="border border-zinc-800 text-black py-2 px-4 mr-2 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
        >
          Anterior
        </Link>
      )}
      {query < countPage && (
        <Link
          href={`?page=${Number(query) + 1}`}
          className="border border-zinc-800 text-black py-2 px-4 rounded-md hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition duration-500"
        >
          Próxima
        </Link>
      )}
    </>
  )
}
