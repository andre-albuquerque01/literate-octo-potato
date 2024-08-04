'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetListItens(page: number) {
  try {
    const response = await ApiRoute(`/itensa?page=${page}`, {
      next: {
        revalidate: 60,
        tags: ['itens'],
      },
    })
    const datas = await response.json()

    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (error) {
    return { data: [], countPage: 0 }
  }
}
