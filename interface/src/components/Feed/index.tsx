import { trpc } from "../../utils/trpc"
import { PublishedTweet } from "../PublishedTweets";
import { TweetBox } from "../TweetBox"
import { TweetInput } from "../TweetInput";



export default function Feed() {
  const { data: usersFeed, isLoading } = trpc.tweet.getUsersFeed.useQuery();

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
          usersFeed && usersFeed.feed.tweets.map(tweet => (<PublishedTweet key={tweet.id} tweetInfos={tweet} />))
        }
      </div>
    </div>
  )
}