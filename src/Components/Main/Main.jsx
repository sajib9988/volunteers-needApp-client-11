import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'


const Main = () => {
  return (
    <div>
    
      <Navbar />

      <div className='min-h-[calc(100vh-306px)]'>
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Main