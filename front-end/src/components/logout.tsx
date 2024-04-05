'use client'
import { LogoutUser } from '@/app/actions/user/logout'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Logout = () => {
  const router = useRouter()
  const handleLogOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await LogoutUser()
    router.push('/user/login')
  }
  return (
    <button className="flex items-center gap-2" onClick={handleLogOut}>
      <LogOut className="h-5 w-5" />
      Sair
    </button>
  )
}
