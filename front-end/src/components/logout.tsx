'use client'
import Api from '@/data/api'
import { LogOut } from 'lucide-react'

async function logOut() {
  try {
    await Api('/user/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const Logout = () => {
  const handleLogOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    await logOut()
    window.location.replace('/user/login')
  }
  return (
    <button className="flex items-center gap-2" onClick={handleLogOut}>
      <LogOut className="h-5 w-5" />
      Sair
    </button>
  )
}
