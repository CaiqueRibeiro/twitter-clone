import { Home, Search, Bell, Mail, Bookmark, ClipboardList, BadgeCheck, User2, MoreHorizontalIcon } from "lucide-react"

export default function Menu() {
  return (
    <>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <Home color="white" size={24} />
        <span className="text-white text-lg">Home</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <Search color="white" size={24} />
        <span className="text-white text-lg">Explore</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <Bell color="white" size={24} />
        <span className="text-white text-lg">Notifications</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <Mail color="white" size={24} />
        <span className="text-white text-lg">Messages</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <ClipboardList color="white" size={24} />
        <span className="text-white text-lg">List</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <Bookmark color="white" size={24} />
        <span className="text-white text-lg">Bookmarks</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <BadgeCheck color="white" size={24} />
        <span className="text-white text-lg">Verified</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <User2 color="white" size={24} />
        <span className="text-white text-lg">Profile</span>
      </div>
      <div className="cursor-pointer h-14 pl-3 pr-10 flex items-center justify-start rounded-full gap-5 transition ease-in-out hover:bg-zinc-900 duration-200">
        <MoreHorizontalIcon color="white" size={24} />
        <span className="text-white text-lg">More</span>
      </div>
    </>
  )
}