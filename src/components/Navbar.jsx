import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin } from "../store/asyncThunk/authThunk.js";
import { requestOtp } from "../store/asyncThunk/otpThunk.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  // Example authentication state (replace this with actual authentication logic)
  const { userData, loading, initialLogin } = useSelector(state => state.auth); // Update dynamically based on login status

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subscription Plans", path: "/plans" },
    { name: "Customize", path: "/customize" },
    { name: "Orders", path: "/orders" },
  ];

  const handleLogin = async () => {
    navigate("/auth/login");
  };

  return (
    <nav className="bg-black text-gray-200 shadow-lg !sticky top-0 z-50">
      <div className="w-full md2:w-5/6 mx-auto md2:px-0 px-6 flex justify-between items-center p-2.5">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-indigo-600 text-transparent bg-clip-text"
        >
          GetMeABox
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:space-x-4 lg:space-x-6 items-center">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-gray-400 transition font-semibold ${isActive
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text"
                  : "hover:text-white"}`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* Show profile icon if authenticated, else show Login button */}
          {userData ? (
            <NavLink to="/account" className=" text-gray-300 bg-gray-700 rounded-full w-10 overflow-hidden aspect-square hover:text-white">
              <img src={userData?.prefs?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}&backgroundType=gradientLinear`} alt="Profile pic" className="w-full" />

            </NavLink>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading || initialLogin}
              className=" bg-yellow-500 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition duration-300 font-bold"
            >
              {(loading || initialLogin) ? <LoaderCircle className="animate-spin" size={24} /> : "Login"}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-x-4 md:hidden">

          {userData ? (
            <NavLink to="/account" className=" text-gray-300 bg-gray-700 w-10 overflow-hidden aspect-square rounded-full  hover:text-white">
              <img src={userData?.prefs?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}&backgroundType=gradientLinear`} alt="Profile pic" className="w-full" />
            </NavLink>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading || initialLogin}
              className=" bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition duration-300"
            >
              {(loading || initialLogin) ? <LoaderCircle className="animate-spin" size={24} /> : "Login"}

            </button>
          )
          }

          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-300 text-black shadow-lg"
          >
            {navItems.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className="block px-6 py-3 dark:hover:bg-gray-800 hover:bg-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
