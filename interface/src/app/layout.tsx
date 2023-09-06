import './globals.css'
import { Inter } from 'next/font/google'
import { ClientProvider } from "../utils/trpc"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone using Next.js 13',
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className='h-screen bg-zinc-950 flex justify-center'>
          <div className='flex w-[1280px]'>
            {children}
          </div>
        </body>
      </html>
    </ClientProvider>
  )
}
