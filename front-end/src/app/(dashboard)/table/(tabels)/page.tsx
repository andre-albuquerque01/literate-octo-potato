import { TableStatus } from '@/components/Table-status'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Tables() {
  return (
    <div className="max-md:w-[80%] max-md:mx-auto">
      <Link href="" className="flex items-center py-4 md:hidden">
        <ArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <h1 className="text-2xl">Mesas</h1>
      <div className="space-y-5 mt-5">
        <TableStatus numberTable={1} status="vazia" />
        <TableStatus numberTable={2} status="ocupada" />
        <TableStatus numberTable={3} status="vazia" />
        <TableStatus numberTable={4} status="vazia" />
        <TableStatus numberTable={5} status="ocupada" />
      </div>
    </div>
  )
}
