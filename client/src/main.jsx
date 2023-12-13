import React, { useState } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Home, Login, Posts, Users } from './routes'

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

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('token')
  )

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
