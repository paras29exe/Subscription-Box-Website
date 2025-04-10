// intialise context api for cart
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const cartContext = createContext({
  items: {
    books: [{}],
    snacks: [{}],
    tech: [{}],
    skinCare: [{}],
  },
  totalItems: 0,
  activeGenre: String,
  setActiveGenre: (genre) => setActiveGenre(genre),
  addItem: (item, genre) => { },
  removeItem: (itemId, genre) => { },
  clearCart: () => { },
})

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({
    books: [],
    snacks: [],
    tech: [],
    skincare: [],
  });
  const [totalItems, setTotalItems] = useState(0)

  const [activeGenre, setActiveGenre] = useState('books')

  const addItem = (item, genre) => {
    setCart((prevCart) => ({ ...prevCart, [genre]: [...prevCart[genre], item] }));
    setTotalItems((prevTotal) => prevTotal + 1);
  };

  const removeItem = (itemId, genre) => {
    setCart((prevCart) => ({ ...prevCart, [genre]: prevCart[genre].filter(item => item.id !== itemId) }));
    setTotalItems((prevTotal) => prevTotal - 1);
  };

  const clearCart = () => {
    setCart({
      books: [],
      snacks: [],
      tech: [],
      skincare: [],
    });
  };

  // your cart logic here
  return (
    <cartContext.Provider value={{ cart, setCart, addItem, removeItem, activeGenre, setActiveGenre, totalItems }}>
      {children}
    </cartContext.Provider>
  )
}

export const useCart = () => useContext(cartContext)