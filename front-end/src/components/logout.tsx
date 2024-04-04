'use client'
import { LogoutUser } from '@/app/actions/user/logout'
import { LogOut } from 'lucide-react'

export const Logout = () => {
  const handleLogOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await LogoutUser()
    window.location.replace('/user/login')
  }
  return (
    <button className="flex items-center gap-2" onClick={handleLogOut}>
      <LogOut className="h-5 w-5" />
      Sair
    </button>
  )
}
