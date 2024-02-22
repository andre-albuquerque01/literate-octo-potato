import { CircleUser, HomeIcon, ScrollText, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <div className="invisible max-md:visible max-md:bottom-0 mb-5 w-full h-[0.2px] bg-slate-950"></div>
      <header className="min-md:fixed min-md:bottom-0 flex items-center w-full justify-between max-md:justify-center">
        <Image
          src="https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?t=st=1708610933~exp=1708614533~hmac=b7ae02de9def519177ee4614802feff375e2c37e04794c3417ac641d1427c623&w=826"
          alt=""
          width={70}
          height={70}
          className="max-md:hidden"
        />
        <nav className="flex items-center gap-12 max-md:gap-16">
          <Link href="" className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Home</span>
          </Link>
          <Link href="" className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            <span className="max-md:hidden">Buscar</span>
          </Link>
          <Link href="" className="flex items-center gap-2">
            <ScrollText className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Pedido</span>
          </Link>
          <Link href="" className="flex items-center gap-2">
            <CircleUser className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Perfil</span>
          </Link>
        </nav>
      </header>
      <div className="max-md:hidden w-full h-[0.2px] bg-slate-950"></div>
    </>
  )
}
