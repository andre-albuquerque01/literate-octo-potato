import { Search } from 'lucide-react'

export default function SearchIten() {
  return (
    <div className="max-md:w-[320px] mx-auto">
      <form className="flex items-center gap-3 w-full rounded-xl px-5 py-3 border border-slate-400 md:mt-7 ">
        <Search className="w-5 h-5" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar"
          className="flex-1 bg-transparent text-sm outline-none "
        />
      </form>
    </div>
  )
}
