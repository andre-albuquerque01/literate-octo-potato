import { GetAllItens } from '@/actions/itens/getAllItens'
import { SnackCarrossel } from '@/components/itens/SnackCarousel'
import { Carrossel } from '@/components/itens/carousel'
import { DinnerCarrossel } from '@/components/itens/dinnerCarousel'
import { DrinksCarrossel } from '@/components/itens/drinksCarousel'
import { LunchCarrossel } from '@/components/itens/lunchCarousel'

export default async function Dashboard() {
  const data = await GetAllItens()

  return (
    <div className="max-md:mb-14 mb-10">
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
