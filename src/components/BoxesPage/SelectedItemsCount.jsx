export default function SelectedItemsCount({ genres, selectedItems }) {
    return (
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Selected Items by Genre
        </h2>
        <div className="flex gap-4">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="px-4 py-2 bg-purple-100 dark:bg-gray-700 rounded-full"
            >
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {genre.name}:
              </span>
              <span className="ml-2 text-gray-700 dark:text-gray-200">
                {selectedItems[genre.id]?.length || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }