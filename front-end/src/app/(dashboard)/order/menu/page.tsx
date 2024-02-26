import { ListItens } from '@/components/ListItens'

export default function Comanda() {
  return (
    <div className="md:mt-5 space-y-5">
      <p className="text-lg font-semibold max-md:px-6">Comanda</p>
      <div className="flex flex-wrap justify-between max-md:justify-center gap-5 md:w-[80%]">
        <div>
          <ListItens
            href=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            alt="image"
            width={150}
            height={150}
            title="Churrasco"
            value={10}
            waitTime="30 - 40 min"
          />
          <ListItens
            href=""
            src="https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg"
            alt="image"
            width={150}
            height={150}
            title="Churrasco"
            value={10}
            waitTime="30 - 40 min"
          />
        </div>
        <div className="max-md:text-center">
          <p className="font-medium">Data: 10/10/2010</p>
          <p className="font-medium">Mesa: 10</p>
          <p className="font-medium">Preço total: R$ 20</p>
        </div>
      </div>
    </div>
  )
}
