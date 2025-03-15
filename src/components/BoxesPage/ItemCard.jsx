import { motion } from "framer-motion";

export default function ItemCard({
  item,
  isSelected,
  isUnlocked,
  onAddToBox,
  onRemoveFromBox,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "tween", duration: 0.1 }}
      className={`relative p-4 pb-2 rounded-xl shadow-md cursor-pointer transition-all ${isSelected ? "ring-2 ring-purple-600" : "hover:shadow-lg"
        } ${!isUnlocked ? "opacity-50 cursor-not-allowed" : ""
        } bg-white dark:bg-gray-800`}
    >
      {/* Lock Icon for Locked Genres */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <span className="text-white text-2xl">🔒</span>
        </div>
      )}

      {/* Item Image */}
      <div className="w-full aspect-square rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Worth - ${item.price.toFixed(2)}
        </p>

        <p
          className={`mt-1 text-sm ${item.availability === "In Stock"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
            }`}
        >
          {item.availability}
        </p>
      </div>

      {/* Add/Remove Button */}
      <div className="mt-4">
        {isUnlocked && (
          <button
            onClick={isSelected ? onRemoveFromBox : onAddToBox}
            className={`w-full px-4 py-2 rounded-md text-sm font-bold disabled:cursor-not-allowed ${isSelected
                ? "bg-red-500 text-white hover:bg-red-600"
                : "dark:bg-white dark:text-black bg-black text-white hover:bg-gray-300"
              }
              ${item.availability == "Out of Stock" ? "!bg-gray-700 !text-white" : ""}

            `}
            disabled={item.availability == "Out of Stock"}
          >
            {
              item.availability == "Out of Stock" ? "Not availaible" : (isSelected ? "Remove" : "Add to Box")
            }
          </button>
        )}
      </div>
    </motion.div>
  );
}