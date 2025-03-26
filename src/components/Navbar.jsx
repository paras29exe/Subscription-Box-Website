import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null)

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
  }, [isOpen, setIsOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subscription Plans", path: "/plans" },
    { name: "Customize", path: "/customize" },
    { name: "Orders", path: "/orders" },
    { name: "Account", path: "/account" },
  ];

  return (
    <nav className="bg-black text-gray-200 shadow-lg sticky top-0 z-50">
      <div className="w-full md2:w-5/6 mx-auto md2:px-0 px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-indigo-600 text-transparent bg-clip-text"
        >
          GetMeABox
        </NavLink>

        {/* Desktop Menu (Visible on md and above) */}
        <div className="hidden md:flex md:space-x-4 lg:space-x-6">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-gray-400 transition font-semibold ${
                  isActive
                    ? "bg-gradient-to-b from-purple-400 to-indigo-600 text-transparent bg-clip-text"
                    : "hover:text-white"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button (Only visible on small screens) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Only visible on small screens) */}
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
              className="block px-6 py-3 hover:bg-gray-800 transition"
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
