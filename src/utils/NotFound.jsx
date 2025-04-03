import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className=" flex-grow overflow-hidden flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <motion.h1
        className="text-6xl font-bold p-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
