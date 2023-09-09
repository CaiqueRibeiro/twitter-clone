'use client'

import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { AuthContextProvider } from '@/contexts/AuthContext';
import { getToken, setToken } from '@/utils/trpc';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { push } = useRouter();

  if (!localStorage.getItem('access_token')) {
    push('/login');
  }

  if(!getToken()) {
    const savedToken = localStorage.getItem('access_token');
    if(!savedToken) push('/login');
    setToken(savedToken as string)
  }


  return (
    <AuthContextProvider>
      <div className='flex w-[1280px]'>
        <Sidebar />
        {children}
      </div>
    </AuthContextProvider>
  )
}
