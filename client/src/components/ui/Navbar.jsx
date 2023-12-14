import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { INITIAL_USER, useUserContext } from '../../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser, setIsAuthenticated, isAuthenticated, isLoading } =
    useUserContext()

  // todo: verfiy loading state from snapgram to refresh user state

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(INITIAL_USER)
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {isAuthenticated && !isLoading && (
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center ' }}>
              <Typography>Hi, {user.username}</Typography>
              <Button
                variant='contained'
                onClick={handleLogout}
                color='secondary'
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
