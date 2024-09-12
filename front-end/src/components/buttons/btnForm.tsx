export const BtnForm = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center">
      <button className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500">
        {title}
      </button>
    </div>
  )
}
