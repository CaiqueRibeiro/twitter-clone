import Image from "next/image"
import { MoreHorizontalIcon, MessageCircleIcon, Repeat2Icon, HeartIcon, BarChart3Icon, UploadIcon } from "lucide-react"
import { TweetBox } from "../TweetBox"
import { useState } from "react"
import { trpc } from '../../utils/trpc'


export interface PublishedTweetProps {
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
  const [liked, setLiked] = useState(false)

  const likeMutation = trpc.tweet.likeATweet.useMutation({
    onSuccess: ({ message }: { message?: string}) => {
        if(message) {
          alert(message)
        } else {
          setLiked(state => !state)
        }
    },
    onError: (props: any) => {
      alert('error in liking tweet')
    }
  });

  async function handleLike() {
    await likeMutation.mutate({
      tweetId: tweetInfos.id,
      timestamp: new Date().toISOString()
    })
  }

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
          <div className="flex flex-1 justify-between items-center gap-16 ml-8 px-3">
            <button className="group rounded-full items-center flex justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
              <MessageCircleIcon className="text-sky-500" size={18} />
            </button>

            <button className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
              <Repeat2Icon className="text-sky-500" size={18} />
            </button>

            <button
              className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200"
              onClick={handleLike}
            >
              <HeartIcon className={`${liked ? "fill-sky-500 text-transparent" : "text-sky-500"}`} size={18} />
            </button>

            <button className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
              <BarChart3Icon className="text-sky-500" size={18} />
            </button>

            <button className="group rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
              <UploadIcon className="text-sky-500" size={18} />
            </button>
          </div>
        </div>
      </div>
    </TweetBox>
  )
}