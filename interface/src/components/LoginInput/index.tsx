import { User, Lock } from 'lucide-react'

interface LoginProps {
  email: string,
  setEmail: (email: string) => void,
  password: string,
  setPassword: (password: string) => void
}

export default function LoginInput({ email, setEmail, password, setPassword}: LoginProps) {
  return (
<div className='flex flex-col w-96 mt-10'>
<div className='flex py-1'>
      <span className="
      rounded-md
      flex-1
      bg-neutral-800
      border-neutral-800
      border
      px-5
      py-3
      flex
      gap-3
      focus-within:bg-transparent
      focus-within:border-sky-700"
      >
        <User className='text-zinc-400 h-5' />
        <input
          className='flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none'
          type="text"
          placeholder='Insert email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </span>
    </div>

    <div className='flex py-1'>
      <span className="
      rounded-md
      flex-1
      bg-neutral-800
      border-neutral-800
      border
      px-5
      py-3
      flex
      gap-3
      focus-within:bg-transparent
      focus-within:border-sky-700"
      >
        <Lock className='text-zinc-400 h-5' />
        <input
          className='flex-1 text-sm bg-transparent text-zinc-400 placeholder-zinc-400 focus:outline-none'
          type="password"
          placeholder='Insert password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </span>
    </div>
</div>
  )
}