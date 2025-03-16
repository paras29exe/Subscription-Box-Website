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
    addItem: (genre, item) => {},
    removeItem: (genre, itemId) => {},
    clearCart: () => {},
})

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState({
        books: [],
        snacks: [],
        tech: [],
        selfcare: [],
      });

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
            selfcare: [],
        });
      };
      
    // your cart logic here
    return (
        <cartContext.Provider value={{ cart, setCart, addItem, removeItem }}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () => useContext(cartContext)