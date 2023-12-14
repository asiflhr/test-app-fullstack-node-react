// src/components/Users.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material'
import UsersCard from '../../components/ui/UsersCard'

function Users() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:8080/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

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

  const handleEditUser = (userId) => {
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
      <Typography variant='h3' color='initial' fontWeight='bold'>
        Users
      </Typography>
      {users?.map((user) => (
        <UsersCard
          user={user}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={handleEditUser}
          key={user._id}
        />
      ))}

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
