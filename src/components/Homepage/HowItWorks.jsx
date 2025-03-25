import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBoxOpen, FaShippingFast, FaGift } from "react-icons/fa";

const steps = [
  { icon: <FaBoxOpen size={40} className="text-indigo-600 dark:text-indigo-400" />, title: "Subscribe", desc: "Pick a plan that suits you." },
  { icon: <FaShippingFast size={40} className="text-indigo-600 dark:text-indigo-400" />, title: "We Curate", desc: "Our team selects amazing items." },
  { icon: <FaGift size={40} className="text-indigo-600 dark:text-indigo-400" />, title: "Enjoy!", desc: "Receive and unbox your surprises." },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section ref={ref} className="py-12 select-none bg-gray-200 dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-200">How It Works</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}

            transition={{ delay: index * 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {step.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-300">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
