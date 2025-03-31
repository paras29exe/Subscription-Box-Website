import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'  // Add this import
import { CartContextProvider } from './context/cartContext.jsx'
import AuthLayout from './components/auth/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {
  Home,
  Plans,
  Customize,
  Orders,
  Account,
  Login,
  SignUp,
} from "./pages"

function Main() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signup/:step" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="plans" element={<Plans />} />
          <Route path='customize' element={<Customize />} />
          <Route path='orders' element={<Orders />} />
          <Route path='account' element={<Account />} />

        </Route>
      </>
    )
  )
  return <RouterProvider router={router} />
}

// Wrap the App component with BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider>
      <Provider store={store} >
        <Main />
      </Provider>
    </CartContextProvider>
  </StrictMode>,
)
