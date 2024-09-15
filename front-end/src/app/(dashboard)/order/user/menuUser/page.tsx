import ListMenuUserServive from '@/actions/menu/listMenuUser'
import { MenuListComponent } from '@/components/menu/menuList'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function listMenu() {
  const data = await ListMenuUserServive()

  return (
    <div className="flex flex-col min-h-[80%] w-full px-3">
      <Link
        href="/user"
        className="flex items-center gap-1 text-sm w-96 mt-3 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80 mt-5">
        Lista de seus pedidos
      </p>
      <MenuListComponent data={data} />
    </div>
  )
}
