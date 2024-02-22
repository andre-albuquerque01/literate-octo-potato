import { CircleUser, HomeIcon, ScrollText, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <header className="flex items-center w-full justify-between">
        <Image
          src="https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?t=st=1708610933~exp=1708614533~hmac=b7ae02de9def519177ee4614802feff375e2c37e04794c3417ac641d1427c623&w=826"
          alt=""
          width={70}
          height={70}
        />
        <nav className="flex items-center gap-12">
          <Link href="" className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6" /> Home
          </Link>
          <Link href="" className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            Buscar
          </Link>
          <Link href="" className="flex items-center gap-2">
            <ScrollText className="h-6 w-6" /> Pedido
          </Link>
          <Link href="" className="flex items-center gap-2">
            <CircleUser className="h-6 w-6" /> Perfil
          </Link>
        </nav>
      </header>
      <div className="w-full h-[0.2px] bg-slate-950"></div>
    </>
  )
}
