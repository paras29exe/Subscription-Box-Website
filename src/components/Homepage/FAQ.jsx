import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "What is included in the box?", answer: "Each box includes a mix of curated products, from lifestyle to snacks and gadgets." },
  { question: "Can I cancel anytime?", answer: "Yes! You can pause or cancel your subscription anytime from your account." },
  { question: "Do you ship internationally?", answer: "Currently, we only ship within India, but we are expanding soon!" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-12 bg-gray-200 dark:bg-zinc-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-200">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{faq.question}</h3>
              <span className="text-indigo-600 dark:text-indigo-400">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  className="mt-2 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
