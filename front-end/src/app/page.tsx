import ApiRoute from '@/data/apiRoute'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '',
    default: 'TUTU food',
  },
}

async function GetXSRF() {
  try {
    await ApiRoute('/sanctum/csrf-cookie')
  } catch (error) {
    console.error(error)
  }
}

export default async function Home() {
  await GetXSRF()
  return (
    <div className="flex flex-col gap-5 items-center justify-end h-screen max-md:mt-[-80px] md:mt-[-160px] w-80 mx-auto">
      <Image
        src="https://cdn.pixabay.com/photo/2023/12/30/12/52/wine-8478069_1280.png"
        alt="Imagem de entrada"
        width={120}
        height={120}
        className="self-end opacity-80"
        priority
      />
      <div>
        <h1 className="text-lg">Bem-Vindo(a)!</h1>
      </div>
      <div>
        <p className="text-sm opacity-80">Como deseja continuar?</p>
      </div>
      <div className="flex flex-col gap-5 items-center ">
        <Link
          href="/user/login"
          className="flex items-center justify-center font-medium w-80 h-12 outline-blue-800 text-slate-200 rounded-lg bg-blue-600 hover:bg-blue-500"
        >
          Fazer login
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center justify-center font-medium w-80 h-12 outline-red-800 text-slate-200 rounded-lg bg-red-600 hover:bg-red-500"
        >
          Ver cardápio
        </Link>
      </div>
    </div>
  )
}
