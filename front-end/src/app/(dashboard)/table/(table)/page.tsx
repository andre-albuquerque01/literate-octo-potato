import { TableStatus } from '@/components/Table-status'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Tables() {
  return (
    <div className="max-md:w-[80%] max-md:mx-auto md:mt-4">
      <Link
        href="/table/list"
        className="flex items-center gap-2 w-[170px] py-2 text-sm max-md:mb-0 max-md:w-80 mt-3 border-b-2 border-transparent hover:border-red-600 transition duration-500"
      >
        Lista das mesas <ArrowRight className="w-5 h-5" />
      </Link>
      <h1 className="text-2xl mt-2">Mesas</h1>
      <div className="max-md:space-y-5 mt-5 md:flex md:gap-5 md:flex-wrap md:items-center md:w-full">
        <TableStatus />
      </div>
    </div>
  )
}
