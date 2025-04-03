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
  const {initialLogin} = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)

  // auto login user from cookies on first load of website
  useEffect(() => {
    async function autoLoginUser() {
      setLoading(true)
      try {
        await dispatch(autoLogin()).unwrap();
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 400);
       }
    }
    autoLoginUser()
  }, [])

  // if(loading) return <LoadingScreen initialLogin={initialLogin} />;

  return (
    <>
      <ToastContainer
        position="top-center"
        className="top-16"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
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
