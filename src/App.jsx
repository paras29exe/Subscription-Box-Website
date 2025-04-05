import './App.css'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LoadingScreen from './utils/LoadingScreen.jsx'
import { autoLogin } from './store/asyncThunk/authThunk.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const [initialLoading, setInitialLoading] = useState(true)

  // auto login user from cookies on first load of website
  useEffect(() => {
    async function autoLoginUser() {
      try {
        await dispatch(autoLogin()).unwrap();
      } catch (error) {
      }finally{
        setInitialLoading(false)
      }
    }
    autoLoginUser()
  }, [])

  if(initialLoading) return <LoadingScreen />;

  return (
    <>
      <ToastContainer
        position="top-center"
        className="top-16"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        // theme="light"
      />
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
