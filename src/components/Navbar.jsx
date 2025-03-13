import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subscription Plans", path: "/plans" },
    { name: "Customize", path: "/customize" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Account", path: "/account" },
  ];

  return (
    <nav className="bg-gray-950 text-gray-200 shadow-lg sticky top-0 z-50">
      <div className="w-5/6 mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-indigo-600 text-transparent bg-clip-text">
          GetMeABox
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-gray-400  transition text-lg font-semibold ${
                  isActive ? "bg-gradient-to-b from-purple-400 to-indigo-600 text-transparent bg-clip-text " : "hover:text-white"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 text-gray-300"
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
