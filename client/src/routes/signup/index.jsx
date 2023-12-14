// src/components/Login.js
import React, { useEffect, useState } from 'react'
import {
  Backdrop,
  CircularProgress,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'

function Signup() {
  const {
    setUser,
    isLoading: isUserLoading,
    setIsAuthenticated,
  } = useUserContext()
  const [newUser, setNewUser] = useState({ username: '', password: '' })

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.password) {
      console.error('Username and password are required.')
      return
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}users`, newUser)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setIsAuthenticated(true)
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
        Signup
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
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          sx={{ width: '100%' }}
        />
        <TextField
          label='Password'
          type='password'
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          sx={{ width: '100%' }}
        />
        <Button variant='contained' color='primary' onClick={handleCreateUser}>
          Create User
        </Button>

        <Typography variant='body1'>
          Already have an account?{' '}
          <Link to='/login' style={{ textDecoration: 'none' }}>
            Login
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

export default Signup
