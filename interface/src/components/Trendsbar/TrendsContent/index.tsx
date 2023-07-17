import { ReactNode } from 'react'

interface TrendsContentProps {
  children: ReactNode
}

export const TrendsContent = ({ children }: TrendsContentProps) => {
  return (
    <div className="bg-neutral-800 overflow-hidden mt-4 flex flex-col items-start rounded-2xl text-white">
      {children}
  </div>
  )
}