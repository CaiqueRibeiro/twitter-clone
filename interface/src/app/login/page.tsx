'use client'

import { useState } from 'react'
import { Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { trpc, setToken } from '../../utils/trpc'
import LoginInput from '@/components/LoginInput'
import { Token } from 'typescript'

function LogoContainer() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Twitter className="sm:h-4 sm:w-4 md:h-[300px] md:w-[300px] lg:h-[500px] lg:w-[500px] flex-no-shrink" fill="white" color='none' />
    </div>
  )
}

function Login() {
  const loginMutation = trpc.profile.login.useMutation({
    onSuccess: ({ token, message }: { token: string, message: string }) => {
      if (message) {
        setMessage(message)
      } else {
        setMessage('')
        setToken(token);
        push('/home');
      }
    },
    onError: (props: any) => {
      alert('erro')
    }
  });

  const { push } = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="text-white flex-1 pl-8 border-l-2 border-slate-400">
      <h1 className="font-black text-9xl mb-6">TwitterClone</h1>
      <h2 className="font-bold text-5xl mb-8">This is not twitter</h2>
      <span className="text-xl">Post your messages. This is just a copy anyway.</span>

      <LoginInput
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <p className="text-red-500 ml-3">{message}</p>

      <div>
        <button
          type='button'
          disabled={!email || !password}
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
        duration-200
        disabled:bg-slate-500
        '
          onClick={async () => {
            await loginMutation.mutate({
              email,
              password
            })
          }}
        >

          <span className='text-white text-xl'>Connect to Twitter</span>
        </button>
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

