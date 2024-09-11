'use client'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export const FormSearchAddCart = ({ id }: { id: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) return null

    router.push(`/order/addCart/${id}?q=${query}`)
  }

  function handleClear(
    e: React.MouseEvent<
      SVGSVGElement,
      MouseEvent | HTMLElement | HTMLButtonElement
    >,
  ) {
    e.preventDefault()
    router.push(`/order/addCart/${id}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-3 w-full rounded-xl px-5 py-3 border border-slate-400 md:mt-7 "
    >
      <Search className="w-5 h-5" />
      <input
        type="text"
        name="q"
        id="search"
        placeholder="Pesquisar item"
        className="flex-1 bg-transparent text-sm outline-none "
        defaultValue={query ?? ''}
      />
      {query && (
        <div title="Limpar busca">
          <X
            className="w-5 h-5 hover:text-blue-600 cursor-pointer"
            onClick={handleClear}
          />
        </div>
      )}
    </form>
  )
}
