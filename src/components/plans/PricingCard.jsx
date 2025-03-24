import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function PricingPlans({ plans, plansRef, planPrices, selectedPlan, setSelectedPlan, handlePlanSelect }) {
  return (
    <div ref={plansRef} className="mt-16 px-6">
      {/* Section Title */}
      <h3 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400">Choose Your Plan</h3>

      {/* Pricing Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
            onClick={() => { setSelectedPlan(plan.name), handlePlanSelect() }}
            className={`relative p-8 rounded-3xl cursor-pointer transition-all backdrop-blur-lg border border-gray-300 dark:border-gray-700 
              bg-white/60 dark:bg-gray-900/50 hover:shadow-indigo-400/40 dark:hover:shadow-indigo-300/40
              ${selectedPlan === plan.name ? `outline outline-4 ${plan.borderColor}` : ""}`}
          >
            {/* Plan Name */}
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>

            {/* Price */}
            <p className="text-5xl font-extrabold mt-4 text-indigo-600 dark:text-indigo-400">{planPrices[index]}</p>

            {/* Description */}
            <p className="mt-4 text-gray-600 dark:text-gray-300">{plan.description}</p>

            {/* Features List */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                  <FaCheckCircle className="text-green-500 dark:text-green-400 text-lg" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Selection Badge */}
            {selectedPlan === plan.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 bg-indigo-600 dark:bg-indigo-400 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                Selected
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
