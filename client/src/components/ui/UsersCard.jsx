import React, { useState } from 'react'
import axios from 'axios'
import {
  Typography,
  Box,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { purple } from '@mui/material/colors'
import { useUserContext } from '../../context/AuthContext'

const UsersCard = ({ user, handleDeleteUser, handleEdituser }) => {
  const {
    user: currentUser,
    isLoading: isUserLoading,
    isAuthenticated,
  } = useUserContext()

  return (
    <Box
      sx={{
        position: 'relative',
        width: '400px',
        height: '100px',
        backgroundColor: 'white',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h4'
          textAlign='center'
          pt={1}
          color='white'
          sx={{
            borderRadius: '40px',
            width: '60px',
            height: '60px',
            backgroundColor: purple[800],
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Typography>

        <Box>
          <Typography variant='subtitle2' color='inherit'>
            Username: {user?.username}
          </Typography>

          <Typography variant='subtitle2' color='inherit'>
            Role: {user?.role}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {currentUser?.role === 'admin' && isAuthenticated && (
          <Button
            onClick={() => handleDeleteUser(user._id)}
            size='small'
            type='submit'
            variant='contained'
            color='error'
          >
            Delete
          </Button>
        )}
        {currentUser?.id === user._id && isAuthenticated && (
          <Button
            onClick={() => handleDeleteUser(user._id)}
            sx={{ mt: 1 }}
            size='small'
            type='submit'
            variant='outlined'
            color='primary'
          >
            Edit
          </Button>
        )}
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

export default UsersCard
