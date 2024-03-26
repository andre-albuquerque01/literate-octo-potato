import { CircleUser, HomeIcon, ScrollText, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <div className="invisible max-md:visible max-md:fixed max-md:bottom-12 z-20 w-full h-[0.2px] bg-slate-950"></div>
      <header className="max-md:fixed max-md:bottom-0 flex items-center w-full z-10 max-md:h-12 h-20 justify-between max-md:justify-center shadow-md bg-white">
        <Link href="/dashboard">
          <Image
            src="https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?t=st=1708610933~exp=1708614533~hmac=b7ae02de9def519177ee4614802feff375e2c37e04794c3417ac641d1427c623&w=826"
            alt=""
            width={70}
            height={70}
            className="max-md:hidden"
            title="Inicio"
          />
        </Link>
        <nav className="flex items-center gap-12 max-md:gap-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-lg"
            title="Inicio"
          >
            <HomeIcon className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Home</span>
          </Link>
          <Link
            href="/itens/search"
            className="flex items-center gap-2 hover:text-lg"
            title="Pesquisar"
          >
            <Search className="h-6 w-6" />
            <span className="max-md:hidden">Buscar</span>
          </Link>
          <Link
            href="/order/menu"
            className="flex items-center gap-2 hover:text-lg"
            title="Pedido"
          >
            <ScrollText className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Pedido</span>
          </Link>
          <Link
            href="/user"
            className="flex items-center gap-2 mr-2 hover:text-lg"
            title="Perfil"
          >
            <CircleUser className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Perfil</span>
          </Link>
        </nav>
      </header>
      {/* <div className="max-md:hidden w-[80%] mx-auto h-[0.2px] bg-slate-950"></div> */}
    </>
  )
}
