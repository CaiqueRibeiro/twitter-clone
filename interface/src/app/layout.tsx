import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone using Next.js 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-screen bg-zinc-950 flex justify-center'>
          <div className='flex w-[1280px]'>
            <Sidebar />
            {children}
          </div>
      </body>
    </html>
  )
}
