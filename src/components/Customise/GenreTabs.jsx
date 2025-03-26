export default function GenreTabs({ genres, selectedGenre, setSelectedGenre }) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-4 mb-8 rounded-md sticky top-16 !z-20 pb-4 pt-2 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`lg:px-6 lg:py-2 py-1 px-4 rounded-lg text-nowrap font-semibold transition-all ${
              selectedGenre === genre.id
                ? "bg-gradient-to-br from-pink-700 to-indigo-600 text-white"
                : "bg-white text-purple-600 hover:bg-purple-100 dark:bg-zinc-800 dark:text-purple-400 dark:hover:bg-gray-700"
            }`}
          >
            {genre.name}
            {!genre.unlocked && <span className="ml-2 text-sm">🔒</span>}
            {/* {genre.subscribed && (
              <span className="ml-2 text-sm text-green-500">✓</span>
            )} */}
          </button>
        ))}
      </div>
    );
  }