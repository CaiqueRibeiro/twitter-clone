import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";

export default function ProfileButton() {
  return (
    <div className='py-3 px-3 flex items-center mb-4 justify-between rounded-full transition ease-in-out hover:bg-zinc-900 duration-200'>
      <div className='flex justify-start gap-3 flex-1'>
        <Image className='rounded-full' src='https://avatars.githubusercontent.com/u/23503499?v=4' width={40} height={40} alt="" />

        <div className='flex flex-col justify-items-start'>
          <strong className='text-white leading-5'>Caique Ribeiro 🇧🇷</strong>
          <span className='text-gray-500'>@CaiqueRibeiro94</span>
        </div>
      </div>

      <MoreHorizontalIcon color="white" size={20} />
    </div>
  )
}