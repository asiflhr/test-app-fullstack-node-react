// src/components/Users.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

function Users() {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ username: '', password: '' })

  useEffect(() => {
    // setLoading(true)
    axios
      .get('http://localhost:8080/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error))
    // .finally(() => setLoading(false))
  }, [])

  const handleCreateUser = () => {
    setLoading(true)
    if (!newUser.username || !newUser.password) {
      console.error('Username and password are required.')
      setLoading(false)
      return
    }

    axios
      .post('http://localhost:8080/users', newUser)
      .then((response) => {
        setUsers([...users, response.data])
        setNewUser({ username: '', password: '' })
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  const handleDeleteUser = (userId) => {
    setLoading(true)
    axios
      .delete(`http://localhost:8080/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId))
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
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
      <h2>Users</h2>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            {user.username}
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
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
      </Box>

      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          color: '#fff',
        })}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}

export default Users
