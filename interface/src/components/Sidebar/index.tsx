import { Twitter } from 'lucide-react'
import Menu from './Menu'

export default function Sidebar() {
  return (
    <div className='w-72 flex flex-col justify-between pl-1'>
      <div className='flex flex-col gap-1 items-start'>
        <div className='h-14 flex items-center justify-center rounded-full w-14 transition ease-in-out hover:bg-zinc-900 duration-200'>
          <Twitter fill="white" color='none' size={30} />
        </div>
        <Menu />
        <div className='h-12 w-[80%] px-3 m-2 flex items-center justify-center bg-sky-500 rounded-full gap-5 transition ease-in-out hover:bg-sky-600 duration-200'>
          <span className='text-white text-lg'>Tweet</span>
        </div>
      </div>

      <div className='h-14'> Perfil</div>
    </div>
  )
}