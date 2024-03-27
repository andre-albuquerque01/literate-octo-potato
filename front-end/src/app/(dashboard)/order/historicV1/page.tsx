import Api from '@/data/api'
import Image from 'next/image'

async function getHistoric() {
  try {
    const request = await Api('/menu/historic', {
      cache: 'no-cache',
    })
    const reqJson = await request.json()
    return reqJson
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default async function Historic() {
  const data = await getHistoric()
  console.log(data)

  return (
    <div className="md:mt-5 space-y-5">
      <p className="text-lg font-semibold max-md:px-6">Histórico</p>
      <div className="flex max-md:justify-center gap-5 shadow-xl mb-4 md:justify-around md:w-[60%]">
        <div>
          <div className="flex gap-2 p-2">
            <Image
              src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
              alt="imagem"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="flex flex-col justify-evenly">
              <p className="font-medium text-md truncate">Churrasco</p>
              <p className="font-medium text-md">R$ 10</p>
            </div>
          </div>
          <div className="flex gap-2 p-2">
            <Image
              src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
              alt="imagem"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="flex flex-col justify-evenly">
              <p className="font-medium text-md truncate">Churrasco</p>
              <p className="font-medium text-md">R$ 10</p>
            </div>
          </div>
        </div>
        <div className="max-md:text-center flex flex-col gap-2">
          <p className="font-medium text-sm">Concluído</p>
          <p className="font-medium text-sm">Data: 10/10/2010</p>
          <p className="font-medium text-sm">Mesa: 10</p>
          <p className="font-medium text-sm">Preço total: R$ 20</p>
        </div>
      </div>
    </div>
  )
}
