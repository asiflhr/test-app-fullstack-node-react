import React, { useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import { Home, Login, Posts, Users } from './routes'
import App from './App'

// todo: set protected routing for frontend, check authentication, and make auth functions login logout, and make ui

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
