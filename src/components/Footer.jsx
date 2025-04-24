// components/Footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t dark:border-gray-600 border-black dark:bg-gray-900/70 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">GetMeABox</h2>
            <p className="mt-2 text-sm">
              Your personalized subscription box service. Discover new favorites, monthly!
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Categories</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <NavLink to="/categories/books" className="hover:underline">Books</NavLink>
              <NavLink to="/categories/snacks" className="hover:underline">Snacks</NavLink>
              <NavLink to="/categories/beauty" className="hover:underline">Beauty</NavLink>
              <NavLink to="/categories/lifestyle" className="hover:underline">Lifestyle</NavLink>
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Links</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <NavLink to="/about" className="hover:underline">About Us</NavLink>
              <NavLink to="/contact" className="hover:underline">Contact</NavLink>
              <NavLink to="/faq" className="hover:underline">FAQ</NavLink>
              <NavLink to="/terms" className="hover:underline">Terms & Conditions</NavLink>
            </nav>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Stay Connected for Updates!</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-blue-500"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
            </div>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none text-sm"
              />
              <button className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded text-sm font-medium hover:opacity-90">
                Stay Informed
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} GetMeABox. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
