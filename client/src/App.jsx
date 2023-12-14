import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup, Users } from './routes'
import AuthLayout from './layouts/auth-layout'
import RootLayout from './layouts/root-layout'

const App = () => {
  return (
    <main>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
