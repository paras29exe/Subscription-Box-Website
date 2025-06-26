import './App.css'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LoadingScreen from './utils/LoadingScreen.jsx'
import { autoLogin } from './store/asyncThunk/authThunk.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './components/Footer.jsx'
import axios from 'axios'

function App() {
  const dispatch = useDispatch()
  const [serverStatus, setServerStatus] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)

  // auto login user from cookies on first load of website
  useEffect(() => {
    async function autoLoginUser() {
      try {
        await dispatch(autoLogin()).unwrap();
      } catch (error) {
      } finally {
        setInitialLoading(false)
      }
    }
    axios.get(import.meta.env.VITE_SERVER_BASE_URL + '/health')
      .then(autoLoginUser)
      .catch(err => {
        setServerStatus(false);
        setInitialLoading(false); // Stop loading if server is down
        throw new Error('Server is down');
      })
  }, [])

  if (initialLoading) return (
    <></>
  );

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
      <Footer />
    </>
  )
}

export default App
