import { ReactNode } from 'react'

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto p-6 w-full h-screen max-w-[1600px]">{children}</div>
  )
}
