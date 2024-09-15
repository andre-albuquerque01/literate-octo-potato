import ApiRoute from '@/data/apiRoute'
import { redirect } from 'next/navigation'

export async function GET(
  _: Request,
  { params }: { params: { email: string } },
) {
  const response = await ApiRoute(
    `/email/verify/${params.email[0]}/${params.email[1]}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (response.ok) redirect('/user/login')
  else redirect('/user/login')
}
