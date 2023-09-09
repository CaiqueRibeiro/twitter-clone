'use client'

import { useState } from 'react'
import { Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { trpc, setToken } from '../../utils/trpc'

function LogoContainer() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Twitter className="sm:h-4 sm:w-4 md:h-[300px] md:w-[300px] lg:h-[500px] lg:w-[500px] flex-no-shrink" fill="white" color='none' />
    </div>
  )
}

function Login() {
  const loginMutation = trpc.profile.login.useMutation({
    onSuccess: ({ token }) => {
      setToken(token);
    }
  });

  const { push } = useRouter()
  const [message, setMessage] = useState("");

  return (
    <div className="text-white flex-1 pl-8 border-l-2 border-slate-400">
      <h1 className="font-black text-9xl mb-6">TwitterClone</h1>
      <h2 className="font-bold text-5xl mb-8">This is not twitter</h2>
      <span className="text-xl">Post your messages. This is just a copy anyway.</span>

      <div>
        <button
          type='button'
          className='
        flex
        items-center
        justify-center
        w-96
        px-3
        py-3
        mt-8
        bg-sky-500
        rounded-full
        transition
        ease-in-out
        hover:bg-sky-600
        duration-200'
          onClick={async () => {
            await loginMutation.mutate({
              email: "ribeiro.caique95@gmail.com",
              password: "9558"
            })
            push('/home');
          }}
        >

          <span className='text-white text-xl'>Connect to Twitter</span>
        </button>
        <p className="text-red-500 ml-3">{message}</p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="flex p-5 min-h-screen items-center justify-between flex-1">
      <LogoContainer />
      <Login />
    </div>
  )
}

export default Home;

