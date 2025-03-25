import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-6 overflow-hidden">
      {/* Background Overlay Graphics */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full" />

      <div className="relative max-w-6xl text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            Curated Subscription Boxes <br /> Delivered to Your Doorstep
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            Discover hand-picked products tailored to your interests. Subscribe now and enjoy exclusive surprises every month!
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold rounded-lg flex items-center gap-2">
            Subscribe Now <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Right Side Floating Box Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center"
        >
          {/* Background Glow */}
          <div className="absolute w-64 h-64 bg-yellow-500 opacity-30 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          {/* Floating Subscription Box */}
          <motion.img
            src="/src/assets/images/heroBox.png" // Ensure correct path
            alt="Subscription Box"
            className="w-full mx-auto drop-shadow-2xl rounded-lg transform transition-transform duration-500 hover:rotate-0 hover:scale-105"
            initial={{ y: 0, rotate: 2 }}
            animate={{ y: [-80, 80, -80] }} // Subtle floating effect
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            whileHover={{ rotateY: 10, rotateX: 10 }} // 3D hover effect
          />
        </motion.div>


      </div>
    </div>
  );
}
