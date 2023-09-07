import Image from "next/image"
import { Image as ImageIcon, LayoutList, Smile, CalendarClock, MapPin, MoreHorizontalIcon } from "lucide-react"
import { TweetBox } from "../TweetBox";

interface PublishedTweetProps {
  tweetInfos: {
    id: string
    author: {
      id: string
      email: string
      username: string
      profileImage: string
    },
    content: string
    isActive: boolean,
    createdAt: string
    updatedAt: string
  }
}

export function PublishedTweet({ tweetInfos }: PublishedTweetProps) {
  return (
    <TweetBox>
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 gap-4">
          <div className="">
            <Image className="rounded-full" src={tweetInfos.author.profileImage} width={40} height={40} alt="" />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <strong>{tweetInfos.author.username}</strong>
                <span className="text-md text-zinc-400">{tweetInfos.author.email}</span>
              </div>
              <button className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4] group-hover:text-sky-600" size={18} />
              </button>
            </div>

            <div>
              <span className="font-light">
                {tweetInfos.content}
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