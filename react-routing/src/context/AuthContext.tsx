import { createContext, ReactNode, useContext, useState } from 'react'

type AuthContextType = {
  user: { name: string } | null
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(() => {
    const raw = localStorage.getItem('demo_user')
    return raw ? JSON.parse(raw) : null
  })

  const login = (name: string) => {
    const username = { name }
    setUser(username)
    localStorage.setItem('demo_user', JSON.stringify(username))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('demo_user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
