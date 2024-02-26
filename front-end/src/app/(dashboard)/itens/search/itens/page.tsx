import { ListItens } from '@/components/ListItens'

export default function ListItensens() {
  return (
    <div className="mt-5 space-y-5">
      <p className="text-md font-normal max-md:px-8">
        Pesquisado por: <span className="font-medium">Pão</span>
      </p>
      <div className="flex flex-wrap max-md:justify-center gap-5">
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
          // waitTime="30 - 40 min"
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
    </div>
  )
}
