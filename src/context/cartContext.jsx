// intialise context api for cart
import { createContext, useContext, useState } from "react";

const cartContext = createContext({
    items: {
        books: [{}],
        snacks: [{}],
        tech: [{}],
        skinCare: [{}],
    },
    total: 0,
    activeGenre: String,
    setActiveGenre: (genre) => setActiveGenre(genre),
    addItem: (item, genre) => {},
    removeItem: (itemId, genre) => {},
    clearCart: () => {},
})

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState({
        books: [],
        snacks: [],
        tech: [],
        skincare: [],
      });

      const [activeGenre, setActiveGenre] = useState('books')

      const addItem = (item, genre) => {
        setCart((prevCart) => ({...prevCart, [genre]: [...prevCart[genre], item] }));
      };
      
      const removeItem = (itemId, genre) => {
        setCart((prevCart) => ({...prevCart, [genre]: prevCart[genre].filter(item => item.id !== itemId) }));
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
        <cartContext.Provider value={{ cart, setCart, addItem, removeItem, activeGenre, setActiveGenre }}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () => useContext(cartContext)