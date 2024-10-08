import { CircleUser, HomeIcon, ScrollText, Search } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const cookieStore = cookies()
  const token = cookieStore.has('token')
  const r = cookieStore.get('r')
  return (
    <div className="shadow-md bg-white md:px-4">
      <div className="invisible max-md:visible max-md:fixed max-md:bottom-12 z-20 w-full h-[0.2px] bg-slate-950"></div>
      <header className="max-md:fixed max-md:bottom-0 md:flex items-center justify-between w-full z-10 max-md:h-12 h-20 bg-white md:max-w-[1200px] mx-auto">
        <Link href="/dashboard">
          <Image
            src="https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?t=st=1708610933~exp=1708614533~hmac=b7ae02de9def519177ee4614802feff375e2c37e04794c3417ac641d1427c623&w=826"
            alt=""
            width={70}
            height={70}
            className="max-md:hidden"
            title="Inicio"
            priority
          />
        </Link>
        <nav className="flex items-center justify-evenly maxm-md:w-full h-full md:gap-12">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:scale-105 hover:text-zinc-400 transition-transform duration-500 overflow-hidden"
            title="Inicio"
          >
            <HomeIcon className="h-6 w-6" />{' '}
            <span className="max-md:hidden">Home</span>
          </Link>
          <Link
            href="/itens/search"
            className="flex items-center gap-2 hover:scale-105 hover:text-zinc-400 transition-transform duration-500 overflow-hidden"
            title="Pesquisar"
          >
            <Search className="h-6 w-6" />
            <span className="max-md:hidden">Buscar</span>
          </Link>
          {token ? (
            <>
              <Link
                href="/order/user/historicUser"
                className={`flex items-center gap-2 hover:scale-105 hover:text-zinc-400 transition-transform duration-500 overflow-hidden ${r?.value && 'hidden'}`}
                title="Pedido"
              >
                <ScrollText className="h-6 w-6" />{' '}
                <span className="max-md:hidden">Pedido</span>
              </Link>
              <Link
                href="/user"
                className="flex items-center gap-2 mr-2 hover:scale-105 hover:text-zinc-400 transition-transform duration-500 overflow-hidden"
                title="Perfil"
              >
                <CircleUser className="h-6 w-6" />{' '}
                <span className="max-md:hidden">Perfil</span>
              </Link>
            </>
          ) : (
            <Link
              href="/user/login"
              className="flex items-center gap-2 mr-2 hover:scale-105 hover:text-zinc-400 transition-transform duration-500 overflow-hidden"
              title="Login"
            >
              <CircleUser className="h-6 w-6" />{' '}
              <span className="max-md:hidden">Login</span>
            </Link>
          )}
        </nav>
      </header>
    </div>
  )
}
