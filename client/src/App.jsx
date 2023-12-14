import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login, Signup, Users } from './routes'
import Navbar from './components/ui/Navbar'
import AuthLayout from './layouts/auth-layout'
import RootLayout from './layouts/root-layout'

const App = () => {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
      {/* <Navbar
        isAuthenticated={authenticated}
        setIsAuthenticated={(state) => setAuthenticated(state)}
      /> */}
    </div>
  )
}

export default App
