import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[92vh] overflow-hidden bg-gradient-to-br dark:from-gray-900 dark:to-black from-gray-300 to-white dark:text-white text-black flex items-center justify-center pb-32 lg:pb-0 overflow-x-hidden">
      {/* Background Overlay Graphics */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-yellow-500 opacity-40 dark:opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500 opacity-40 dark:opacity-20 blur-3xl rounded-full" />

      <div className="relative w-5/6 text-center lg:text-left grid content-center grid-cols-1 lg:grid-cols-2 xl:px-8 items-center z-10">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 order-2 lg:order-1 xl:pr-24"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-transparent bg-clip-text bg-gradient-to-r dark:from-yellow-400 dark:to-orange-600 from-purple-700 to-blue-700">
            Curated <br /> Subscription Boxes <br className="hidden sm:block" /> Delivered to Your Doorstep
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-300 text-black max-w-lg mx-auto lg:mx-0">
            Discover hand-picked products tailored to your interests. Subscribe now and enjoy exclusive surprises every month!
          </p>
          <button className="mt-4 sm:mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-bold rounded-lg flex items-center gap-2 mx-auto lg:mx-0">
            Subscribe Now <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Right Side Floating Box Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center w-full h-full order-1 lg:order-2 "
        >
          {/* Background Glow */}
          <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-yellow-500 opacity-30 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          <motion.div
            className="w-full "
            animate={{ y: [-10, 10, -10] }} // Floating effect
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}// 3D hover effect
          >

            {/* Floating Subscription Box */}
            <img
              src="https://res.cloudinary.com/paras-29/image/upload/v1743050244/college%20project/HomePageImages/mlw4p4prdbu4drgfi9ag.png" // Ensure correct path
              alt="Subscription Box"
              className="mx-auto w-full h-fit sm:w-2/3 lg:w-[90%] object-center drop-shadow-2xl rounded-lg"
            />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
