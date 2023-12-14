import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  // email: '',
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
    setIsLoading(true)
    axios
      .post(`http://localhost:8080/users/${id}`)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        // Redirect to a protected route or update state to indicate login success
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          // email: currentAccount.email,
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

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback')
    if (
      cookieFallback === '[]' ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate('/sign-in')
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
