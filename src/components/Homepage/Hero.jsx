import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/bg-animation.json";

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
      className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center "

    >
      <Lottie className="absolute opacity-[75%] dark:brightness-[40%] top-0 left-0 w-full scale-110 h-full z-[-1] " animationData={heroAnimation} />

      {/* Animated Huge Text */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl md:text-9xl !font-[100] font-[Madeleina Sans] text-gray-900 dark:text-white tracking-wide leading-tight "
      >
        <motion.span
          animate={{ textShadow: "0px 0px 12px rgba(99, 102, 241, 0.8)" }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
          className="bg-gradient-to-br from-purple-500 to-indigo-700 text-transparent bg-clip-text"
        >
          Your Monthly Box
          <p
            animate={{ textShadow: "0px 0px 12px rgba(99, 102, 241, 0.8)" }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
            className="text-indigo-600"
          >
            of Surprises
          </p>
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        viewport={{ once: true }}
        className="mt-4 text-lg md:text-2xl text-gray-800 dark:text-gray-300 max-w-2xl"
      >
        Get a curated box of unique products delivered to your doorstep every month.
      </motion.h2>

      {/* Animated CTA Button with Confetti on Click */}
      <motion.button
        onClick={() => setTriggerConfetti(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-br from-zinc-600 to-black dark:from-gray-700 dark:to-gray-950 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all duration-300 z-10"
      >
        Subscribe Now
      </motion.button>
    </section>
  );
}
