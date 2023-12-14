import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Login, Posts, Users } from './routes'

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token')
  )

  return (
    <div>
      <Routes>
        {!authenticated ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        ) : (
          <>
            <Route path='/users' element={<Users />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='*' element={<Navigate to='/users' />} />
            <Route path='/' element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
