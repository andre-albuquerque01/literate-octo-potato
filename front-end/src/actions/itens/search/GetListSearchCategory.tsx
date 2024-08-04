'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetListSearchCategory(
  typeCategory: string,
  page: number,
) {
  try {
    const response = await ApiRoute(`/itensc/${typeCategory}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
