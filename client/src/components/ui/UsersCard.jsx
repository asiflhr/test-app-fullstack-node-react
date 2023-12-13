import React, { useState } from 'react'
import axios from 'axios'
import {
  Typography,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  useTheme,
} from '@mui/material'
import { purple } from '@mui/material/colors'

const UsersCard = ({ user, handleDeleteUser }) => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)

  return (
    <Box
      sx={{
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

      <Button
        onClick={() => handleDeleteUser(user._id)}
        sx={{ borderRadius: '20px', mt: 1 }}
        size='small'
        type='submit'
        variant='contained'
        color='primary'
      >
        Delete
      </Button>

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

export default UsersCard
