// src/components/Login.js
import React, { useState } from 'react'
import {
  Backdrop,
  CircularProgress,
  useTheme,
  List,
  ListItem,
  Button,
  TextField,
  Box,
} from '@mui/material'
import axios from 'axios'

function Login() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = () => {
    // setLoading(true)
    // axios
    //   .post('http://localhost:8080/auth/login', credentials)
    //   .then((response) => {
    //     localStorage.setItem('token', response.data.token)
    //     // Redirect to a protected route or update state to indicate login success
    //   })
    //   .catch((error) => console.error(error))
    // .finally(() => setLoading(false))
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type='text'
          placeholder='Username'
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type='password'
          placeholder='Password'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login
