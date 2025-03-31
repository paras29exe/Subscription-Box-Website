import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Example authentication state (replace this with actual authentication logic)
  const isAuthenticated = false; // Update dynamically based on login status

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

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <nav className="bg-black text-gray-200 shadow-lg !sticky top-0 z-50">
      <div className="w-full md2:w-5/6 mx-auto md2:px-0 px-6 flex justify-between items-center h-16">
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
          {isAuthenticated ? (
            <NavLink to="/account" className="ml-4 text-gray-300 hover:text-white">
              <User size={24} />
            </NavLink>
          ) : (
            <button
              onClick={handleLogin}
              className="ml-4 bg-yellow-500 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition duration-300 font-bold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          {!isAuthenticated && (
            <button
              onClick={handleLogin}
              className="mr-4 bg-yellow-500 text-black px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          )}

          {isAuthenticated && (
            <NavLink to="/account" className="mr-4 text-gray-300 hover:text-white">
              <User size={24} />
            </NavLink>
          )}

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
