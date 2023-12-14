// src/components/Login.js
import React, { useEffect, useState } from 'react'
import {
  Backdrop,
  CircularProgress,
  useTheme,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { setUser, isLoading: isUserLoading } = useUserContext()
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = async () => {
    axios
      .post('http://localhost:8080/login', credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setUser(response.data.user)
        navigate('/users')
      })
      .catch((error) => console.error(error))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography variant='h3' color='initial' fontWeight='bold'>
        Login
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: { sm: '500px' },
          margin: '1rem',
          padding: '1rem',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Username'
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          sx={{ width: '100%' }}
        />
        <TextField
          label='Password'
          type='password'
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          sx={{ width: '100%' }}
        />
        <Button variant='contained' color='primary' onClick={handleLogin}>
          Login
        </Button>

        <Typography variant='body1'>
          Don't have an account?{' '}
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            Signup
          </Link>
        </Typography>
      </Box>

      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        })}
        open={isUserLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}

export default Login
