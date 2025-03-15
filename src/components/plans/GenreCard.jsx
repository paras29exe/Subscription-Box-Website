import { motion } from "framer-motion";

export default function GenreCard({ genre, index, selectedGenre, handleGenreSelect }) {
  const isSelected = selectedGenre === genre.genre;

  return (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }} // Subtle hover effect
      whileTap={{ scale: 0.98 }} // Light tap effect
      transition={{ type: "tween", duration: 0.1 }} // Fast and snappy transition
      onClick={() => handleGenreSelect(genre.genre)}
      className={`relative p-1.5 sm:p-3 rounded-lg shadow-lg cursor-pointer transition-all 
        border-2 border-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg
        ${isSelected ? "border-yellow-400 shadow-yellow-400/30" : "hover:shadow-md hover:border-purple-300"}
      `}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
        <motion.img
          src={genre.image}
          alt={genre.name}
          className="w-full h-full object-cover rounded-lg"
          whileHover={{ scale: 1.05 }} // Subtle zoom on hover
          transition={{ type: "tween", duration: 0.1 }} // Fast transition
        />
      </div>

      {/* Text Content */}
      <div className="mt-4 text-center">
        <h3 className="text-base sm:text-xl font-bold text-white">{genre.name}</h3>
        <p className="text-gray-200 mt-2 text-xxs sm:text-xs lg:text-sm">{genre.description}</p>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 0.15 }} // Fast and snappy animation
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}