import { MoreHorizontalIcon } from "lucide-react";
import SearchInput from "../SearchInput";
import { TrendsContent } from "./TrendsContent";

export default function Trendsbar() {
  return (
    <div className="flex flex-col w-96 justify-end pr-3 pl-3">
      <SearchInput />
      <div className="flex flex-col items-stretch flex-1">
        <TrendsContent>
          <div className="px-4">
            <h2 className="mt-4 font-bold text-xl">Get verified</h2>
            <strong>Subscribe to unlock new features.</strong>
            <button className='py-2 px-4 my-3 bg-sky-500 rounded-full transition ease-in-out hover:bg-sky-600 duration-200'>
              <span className='text-white text-base font-bold'>Get verified</span>
            </button>
          </div>
        </TrendsContent>

        <TrendsContent>
          <h2 className="font-bold text-xl px-4 mt-4 mb-2">What's happening</h2>

          <div className="cursor-pointer flex w-full pl-4 pr-2 py-2 transition ease-in-out hover:bg-neutral-700 duration-200">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-neutral-500 text-sm">Sports - Trending</span>
                <strong>#PALxSAO</strong>
                <span className="text-neutral-500 text-sm">4,5865 tweets</span>
              </div>
              <button className="rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4]" size={18} />
              </button>
            </div>
          </div>

          <div className="cursor-pointer flex w-full pl-4 pr-2 py-2 transition ease-in-out hover:bg-neutral-700 duration-200">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-neutral-500 text-sm">Sports - Trending</span>
                <strong>#PALxSAO</strong>
                <span className="text-neutral-500 text-sm">4,5865 tweets</span>
              </div>
              <button className="rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4]" size={18} />
              </button>
            </div>
          </div>

          <div className="cursor-pointer flex w-full pl-4 pr-2 py-2 transition ease-in-out hover:bg-neutral-700 duration-200">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-neutral-500 text-sm">Sports - Trending</span>
                <strong>#PALxSAO</strong>
                <span className="text-neutral-500 text-sm">4,5865 tweets</span>
              </div>
              <button className="rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4]" size={18} />
              </button>
            </div>
          </div>

          <div className="cursor-pointer flex w-full pl-4 pr-2 py-2 transition ease-in-out hover:bg-neutral-700 duration-200">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-neutral-500 text-sm">Sports - Trending</span>
                <strong>#PALxSAO</strong>
                <span className="text-neutral-500 text-sm">4,5865 tweets</span>
              </div>
              <button className="rounded-full flex items-center justify-center h-8 w-8 transition ease-in-out hover:bg-sky-700/[.3] duration-200">
                <MoreHorizontalIcon className="text-white/[.4]" size={18} />
              </button>
            </div>
          </div>

          <div className="cursor-pointer flex w-full pl-4 pr-2 py-4 transition ease-in-out hover:bg-neutral-700 duration-200">
            <div className="flex flex-1 justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-sky-500">Show more</span>
              </div>
            </div>
          </div>

        </TrendsContent>
      </div>
    </div>
  )
}