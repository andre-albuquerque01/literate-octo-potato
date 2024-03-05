import { SnackCarrossel } from '@/components/SnackCarousel'
import { Carrossel } from '@/components/carousel'
import { DinnerCarrossel } from '@/components/dinnerCarousel'
import { DrinksCarrossel } from '@/components/drinksCarousel'
import { LunchCarrossel } from '@/components/lunchCarousel'
import Api from '@/data/api'
import { InterfaceItens } from '@/data/type/interfaceItens'

async function getAll(): Promise<InterfaceItens[]> {
  try {
    const request = await Api('/itens/home', {
      next: {
        revalidate: 60,
      },
    })
    const reqJson = await request.json()
    return reqJson
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function Dashboard() {
  const data = await getAll()
  return (
    <div>
      <div>
        {' '}
        <Carrossel data={data} />
      </div>
      <SnackCarrossel data={data} />
      <DrinksCarrossel data={data} />
      <LunchCarrossel data={data} />
      <DinnerCarrossel data={data} />
    </div>
  )
}
