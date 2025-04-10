import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartContextProvider } from './context/cartContext.jsx'
import { DisplayContextProvider } from './context/displayContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Routing from './Routing.jsx'

function Main() {

  return <Routing />
}

// Wrap the App component with BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DisplayContextProvider>
        <CartContextProvider>
          <Main />
        </CartContextProvider>
      </DisplayContextProvider>
    </Provider>
  </StrictMode>
)
