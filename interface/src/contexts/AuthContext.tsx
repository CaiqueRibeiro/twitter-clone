import { ReactNode, createContext, useState } from 'react';

interface UserProps {
  id: string
  username: string
  email: string
  profileImage: string
  createdAt: string
  updatedAt: string
}


interface AuthContextType {
  userData: UserProps
  saveUserData: (data: UserProps) => void
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState({} as UserProps);

  function saveUserData(user: UserProps) {
    setUserData(user)
  }

  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}