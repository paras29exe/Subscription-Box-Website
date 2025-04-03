import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CartContextProvider } from './context/cartContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Routing from './Routing.jsx'

function Main() {

  return <Routing />
}

// Wrap the App component with BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
          <Main />
      </CartContextProvider>
    </Provider>
  </StrictMode>
)
