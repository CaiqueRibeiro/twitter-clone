import { Search } from 'lucide-react'

export default function SearchInput() {
  return (
    <div className='flex py-1'>
      <span className="
      rounded-full
      flex-1
      bg-neutral-800
      border-neutral-800
      border
      px-5
      py-3
      flex
      gap-3
      focus-within:bg-transparent
      focus-within:border-sky-700"
      >
        <Search className='text-zinc-400 h-5' />
        <input
          className='flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none'
          type="text"
          placeholder='Search Twitter'
        />
      </span>
    </div>
  )
}