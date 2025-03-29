import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        {/* <div className='flex-grow'> */}
          <Outlet />
        {/* </div> */}
      </div>
    </>
  )
}

export default App
