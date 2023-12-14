import { Outlet } from 'react-router-dom'

import Navbar from '../../components/ui/Navbar'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Navbar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout
