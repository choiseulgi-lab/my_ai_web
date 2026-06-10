import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('dorun_user')
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('dorun_user')
      }
    }
  }, [])

  const login = (user) => {
    setCurrentUser(user)
    localStorage.setItem('dorun_user', JSON.stringify(user))
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('dorun_user')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
