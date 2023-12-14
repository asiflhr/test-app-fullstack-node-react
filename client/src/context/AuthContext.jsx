import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'

export const INITIAL_USER = {
  id: '',
  username: '',
  role: 'user',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
}

const AuthContext = createContext(INITIAL_STATE)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(INITIAL_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentUser = async () => {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      if (currentAccount) {
        setUser({
          id: currentAccount._id,
          username: currentAccount.username,
          role: currentAccount.role,
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Added useEffect hook to listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthUser() // Trigger re-render on localStorage update
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    const cookieFallback = localStorage.getItem('user')
    if (
      cookieFallback === '[]' ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate('/login')
    }

    checkAuthUser()
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useUserContext = () => useContext(AuthContext)
