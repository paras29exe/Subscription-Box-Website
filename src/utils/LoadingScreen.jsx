import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

export default function LoadingScreen() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-center bg-white text-gray-900 dark:bg-black dark:text-white">
      <motion.div
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-4"
      >
        <Box className="w-12 h-12 animate-bounce" />
        <span className="text-lg font-medium">Loading GetMeABox{".".repeat(dots)}</span>
      </motion.div>
    </div>
  );
}