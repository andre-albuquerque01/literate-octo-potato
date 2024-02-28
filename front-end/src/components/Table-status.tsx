import { X, CheckCircle } from 'lucide-react'

interface Table {
  numberTable: number
  status: string
}

export const TableStatus = (props: Table) => {
  return (
    <div className="md:w-[20%] flex justify-between items-center border border-zinc-400 p-4 shadow-md">
      <div className="">
        <p>Mesa {props.numberTable}</p>
        <p className="">{props.status}</p>
      </div>
      {props.status === 'vazia' ? (
        <CheckCircle className="w-5 h-5  rounded-full" />
      ) : (
        <X className="w-5 h-5 bg-black text-white rounded-full" />
      )}
    </div>
  )
}
