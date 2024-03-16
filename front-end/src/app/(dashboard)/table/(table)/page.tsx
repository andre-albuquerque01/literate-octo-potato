import { TableStatus } from '@/components/Table-status'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function Tables() {
  return (
    <div className="max-md:w-[80%] max-md:mx-auto md:mt-4">
      <Link href="" className="flex items-center py-4 md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <h1 className="text-2xl">Mesas</h1>
      <div className="max-md:space-y-5 mt-5 md:flex md:gap-5 md:flex-wrap md:items-center md:w-full">
        <TableStatus />
      </div>
    </div>
  )
}
