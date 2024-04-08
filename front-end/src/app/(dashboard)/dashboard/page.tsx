import { GetAllItens } from '@/app/actions/itens/getAllItens'
import { SnackCarrossel } from '@/components/SnackCarousel'
import { Carrossel } from '@/components/carousel'
import { DinnerCarrossel } from '@/components/dinnerCarousel'
import { DrinksCarrossel } from '@/components/drinksCarousel'
import { LunchCarrossel } from '@/components/lunchCarousel'

export default async function Dashboard() {
  const reqBody = await GetAllItens()
  const data = reqBody.data

  return (
    <div>
      <div>
        <Carrossel data={data} />
      </div>
      <SnackCarrossel data={data} />
      <DrinksCarrossel data={data} />
      <LunchCarrossel data={data} />
      <DinnerCarrossel data={data} />
    </div>
  )
}
