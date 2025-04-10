import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const displayContext = createContext({
    showPopup: false,
    setShowPopup: () => { },
    showToast: () => { },
})

export const DisplayContextProvider = ({ children }) => {

    const [showPopup, setShowPopup] = useState(false)

    const showToast = () => {
        toast.warn("You need to be logged in to for this action!", { toastId: "auth-warning", className: "text-black" });
    }

    return (
        <displayContext.Provider value={{ showPopup, setShowPopup, showToast }}>
            {children}
        </displayContext.Provider>
    )
}

export const useDisplayContext = () => useContext(displayContext)