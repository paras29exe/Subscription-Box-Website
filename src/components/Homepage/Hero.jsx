import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import boxVideo from "../../assets/box-video.mp4"

export default function Hero() {
  const { width, height } = useWindowSize();

  // const [showConfetti, setShowConfetti] = useState(true);
  // const [triggerConfetti, setTriggerConfetti] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowConfetti(false), 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center !bg-transparent "

    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover brightness-[25%] z-[-1]"
      >
        <source src={boxVideo} type="video/mp4" />
      </video>

      {/* Animated Huge Text */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-extrabold text-gray-900 dark:text-white leading-tight "
      >
        <motion.span
          animate={{ textShadow: "0px 0px 12px rgba(99, 102, 241, 0.8)" }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-transparent bg-clip-text"
        >
          Your Monthly Box
        </motion.span>
        <br />
        <motion.span
          animate={{ textShadow: "0px 0px 12px rgba(99, 102, 241, 0.8)" }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
          className="text-indigo-600 dark:text-indigo-400"
        >
          of Surprises
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        viewport={{ once: true }}
        className="mt-4 text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl"
      >
        Get a curated box of unique products delivered to your doorstep every month.
      </motion.p>

      {/* Animated CTA Button with Confetti on Click */}
      <motion.button
        onClick={() => setTriggerConfetti(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-br from-zinc-600 to-black dark:from-gray-700 dark:to-gray-900 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-300 z-10"
      >
        Subscribe Now
      </motion.button>
    </section>
  );
}
