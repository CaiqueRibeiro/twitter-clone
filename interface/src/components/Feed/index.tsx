import { ReactNode } from "react"
import Image from "next/image"
import { Image as ImageIcon, LayoutList, Smile, CalendarClock, MapPin, MoreHorizontalIcon } from "lucide-react"
import { trpc } from '../../utils/trpc';

interface TweetBoxProps {
  children: ReactNode
}

function TweetBox({ children }: TweetBoxProps) {
  return (
    <div className="px-4 py-2 flex border-b-2 border-zinc-800 text-white">
      {children}
    </div>
  )
}

function TweetInput() {
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

function PublishedTweet({ item }: any) {
  return (
    <TweetBox>
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 gap-4">
          <div className="">
            <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/23503499?v=4" width={40} height={40} alt="" />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <strong>Zé da Manga</strong>
                <span className="text-md text-zinc-400">@zedamanga_</span>
              </div>
              <button className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4] group-hover:text-sky-600" size={18} />
              </button>
            </div>

            <div>
              <span className="font-light">
                {item.content}
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-10 mt-4">
          <div className="flex flex-1 justify-center items-center  gap-16">
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
        </div>
      </div>
    </TweetBox>
  )
}

export default function Feed() {
  const { data } = trpc.tweet.getUsersFeed.useQuery({ followerId: '8146eea1-3430-4f22-ac3b-9a72a09d891e' });

  return (
    <div className="flex flex-1 flex-col justify-start border-x border-zinc-800 overflow-x-auto">
      <div className="sticky top-0 bg-black/[.6] backdrop-blur-md flex flex-col border-b-2 border-zinc-800 pt-3">
        <h1 className="text-white text-xl font-bold mb-4 px-4">Home</h1>
        <div className="flex-1 flex text-white">
          <div className="flex-1 flex justify-center items-end h-14 hover:bg-zinc-900 duration-500">
            <span className="self-stretch font-bold flex items-center text-sm border-b-4 border-sky-500">For you</span>
          </div>

          <div className="flex-1 flex justify-center items-end  h-14 hover:bg-zinc-900 duration-500">
            <span className="text-zinc-400 self-stretch flex items-center text-sm border-b-4 border-transparent">Following</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <TweetInput />

        <TweetBox>
          <div className="flex justify-center items-center flex-1 py-1 cursor-pointer">
            <span className="text-md text-sky-500">Show 70 Tweets</span>
          </div>
        </TweetBox>
        {
          data && data.feed.tweets.map(item => (<PublishedTweet item={item} />))
        }
      </div>
    </div>
  )
}