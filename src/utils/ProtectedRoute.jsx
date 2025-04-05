import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        if (!userData) {
            toast.warn("You need to be logged in to access this page!", { toastId: "auth-warning" });
        }
    }, []);

    
    return userData ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
