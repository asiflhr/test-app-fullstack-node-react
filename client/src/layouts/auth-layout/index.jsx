import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
import { Box } from '@mui/material'

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext()

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/users' />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </Box>

          <Box
            sx={{
              height: '100vh',
              width: '50%',
              display: { lg: 'block', xs: 'none' },
            }}
          >
            <img
              src='https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='logo'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </Box>
        </Box>
      )}
    </>
  )
}
