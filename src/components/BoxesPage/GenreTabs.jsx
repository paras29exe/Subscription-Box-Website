export default function GenreTabs({ genres, selectedGenre, setSelectedGenre }) {
    return (
      <div className="flex justify-center gap-4 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedGenre === genre.id
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 hover:bg-purple-100 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
            }`}
          >
            {genre.name}
            {!genre.unlocked && <span className="ml-2 text-sm">🔒</span>}
            {genre.subscribed && (
              <span className="ml-2 text-sm text-green-500">✓</span>
            )}
          </button>
        ))}
      </div>
    );
  }