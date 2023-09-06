import Sidebar from '@/components/Sidebar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex w-[1280px]'>
      <Sidebar />
      {children}
    </div>

  )
}
