import { ReactNode } from 'react'

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto py-2 w-full h-screen max-w-[1600px]">
      {children}
    </div>
  )
}
