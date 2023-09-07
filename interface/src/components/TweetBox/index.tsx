import { ReactNode } from "react"


interface TweetBoxProps {
  children: ReactNode
}

export function TweetBox({ children }: TweetBoxProps) {
  return (
    <div className="px-4 py-2 flex border-b-2 border-zinc-800 text-white">
      {children}
    </div>
  )
}
