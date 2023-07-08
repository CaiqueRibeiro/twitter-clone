import { Search } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex-1 flex gap-7'>
      <div className='border-x border-zinc-800 flex-1 flex-col'>
      </div>

      <div className='flex flex-col w-96 pt-2 pr-6'>
        <span className="
          rounded-full
          w-full
          bg-neutral-800
          border-neutral-800
          border
          px-5
          py-3
          flex
          gap-3
          focus-within:bg-transparent
          focus-within:border-sky-700
          focus-within:border"
        >
          <Search className='text-zinc-400 h-5' />
          <input
            className='flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none'
            type="text"
            placeholder='Search Twitter'
          />
        </span>
      </div>
    </div>
  )
}
