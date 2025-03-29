export default function GenreTabs({ genres, selectedGenre, setSelectedGenre }) {
    return (
      <div className="grid grid-cols-2 px-4 sm:grid-cols-4 gap-2 lg:gap-4 mb-4 sticky top-[60px] !z-20 pb-4 pt-4 bg-gradient-to-b from-transparent via-gray-600/60 dark:via-black/70 to-transparent">
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