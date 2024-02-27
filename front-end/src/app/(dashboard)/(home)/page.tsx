import { SnackCarrossel } from '@/components/SnackCarousel'
import { Carrossel } from '@/components/carousel'
import { DinnerCarrossel } from '@/components/dinnerCarousel'
import { DrinksCarrossel } from '@/components/drinksCarousel'
import { LunchCarrossel } from '@/components/lunchCarousel'

export default function Home() {
  return (
    <div>
      <div>
        {' '}
        <Carrossel />
      </div>
      <SnackCarrossel />
      <DrinksCarrossel />
      <LunchCarrossel />
      <DinnerCarrossel />
    </div>
  )
}
