import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from "react-router-dom";
import App from "./App.jsx";
import { Home, Plans, Customize, Orders, Account, Login, SignUp } from "./pages"
import AuthLayout from "./components/auth/AuthLayout.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import NotFound from "./utils/NotFound.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route exact index element={<Home />} />
                <Route path="auth" element={<AuthLayout />}>
                    <Route path="signup/:step" element={<SignUp />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="plans" element={<Plans />} />
                <Route path="customize" element={<Customize />} />
                <Route path="orders" element={<Orders />} />
                <Route path="account"
                    element={
                        <ProtectedRoute >
                            <Account />
                        </ProtectedRoute>}
                />
            <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
)

function Routing() {
    return <RouterProvider router={router} />
}

export default Routing;
