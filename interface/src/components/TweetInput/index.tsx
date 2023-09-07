import Image from "next/image"
import { Image as ImageIcon, LayoutList, Smile, CalendarClock, MapPin, MoreHorizontalIcon } from "lucide-react"
import { TweetBox } from "../TweetBox"

export function TweetInput() {
  return (
    <TweetBox>
      <div className="flex flex-1 gap-4">
        <div className="">
          <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/23503499?v=4" width={40} height={40} alt="" />
        </div>
        <div className="flex flex-1 flex-col">
          <input
            className='flex-1 text-xl font-light py-2 text-zinc-400 placeholder-zinc-400 focus:outline-none bg-transparent'
            type="text"
            placeholder="Whats's happening?!"
          />
          <div className="flex h-10 mt-4">
            <div className="flex flex-1 justify-start items-center  gap-4">
              <button>
                <ImageIcon className="text-sky-500" size={18} />
              </button>

              <button>
                <LayoutList className="text-sky-500" size={18} />
              </button>

              <button>
                <LayoutList className="text-sky-500" size={18} />
              </button>

              <button>
                <Smile className="text-sky-500" size={18} />
              </button>

              <button>
                <CalendarClock className="text-sky-500" size={18} />
              </button>

              <button>
                <MapPin className="text-sky-500" size={18} />
              </button>
            </div>

            <button className='px-4 bg-sky-500 rounded-full transition ease-in-out hover:bg-sky-600 duration-200'>
              <span className='text-white text-base font-bold'>Tweet</span>
            </button>
          </div>
        </div>
      </div>
    </TweetBox>
  )
}