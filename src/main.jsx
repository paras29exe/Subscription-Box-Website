import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'  // Add this import
import Home from './pages/Home.jsx'
import Plans from './pages/Plans.jsx'
import Customize from './pages/Customize.jsx'
import { CartContextProvider } from './context/cartContext.jsx'
import Orders from './pages/Orders.jsx'

function Main() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="plans" element={<Plans />} />
          <Route path='customize' element={<Customize />} />
          <Route path='orders' element={<Orders />} />
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
      <Main />
    </CartContextProvider>
  </StrictMode>,
)
