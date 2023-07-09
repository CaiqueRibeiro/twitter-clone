import SearchInput from "../SearchInput";

export default function Trendsbar() {
  return (
    <div className="flex flex-col items-stretch w-96 pr-3 pl-3">
      <SearchInput />

      <div className="flex flex-col items-stretch gap-6 flex-1">
        <div className="bg-neutral-800 pt-2 pb-3 px-4 mt-4 flex flex-col items-start rounded-2xl text-white">
          <h2 className="font-bold text-xl">Get verified</h2>
          <strong>Subscribe to unlock new features.</strong>
          <button className='py-2 px-4 mt-3 flex items-center justify-center bg-sky-500 rounded-full transition ease-in-out hover:bg-sky-600 duration-200'>
            <span className='text-white text-base font-bold'>Get verified</span>
          </button>
        </div>
      </div>
    </div>
  )
}