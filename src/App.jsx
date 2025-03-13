import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className=''>
      <Navbar/>
      
      <Outlet />
    </div>
    </>
  )
}

export default App
