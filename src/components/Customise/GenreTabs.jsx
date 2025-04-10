import { useState } from "react";
import { Search, ArrowDownAZ, ArrowUpAZ, ArrowDown01, ArrowUp10 } from "lucide-react";

export default function GenreTabs({
  genres,
  selectedGenre,
  setSelectedGenre,
  onSearch,
  onSort
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortFieldChange = (e) => {
    const field = e.target.value;
    setSortField(field);
    onSort(field, sortDirection);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    onSort(sortField, newDirection);
  };

  const SortIcon = () => {
    if (sortField === "name") {
      return sortDirection === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />;
    } else {
      return sortDirection === "asc" ? <ArrowDown01 /> : <ArrowUp10 />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <div className="flex flex-col md2:flex-row md:items-center lg:justify-between gap-4">
          {/* Genre Tabs */}
          <div className="lg:w-1/2 ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`py-1.5 px-3 rounded-lg font-semibold transition-all ${selectedGenre === genre.id
                    ? "bg-gradient-to-br from-pink-700 to-indigo-600 text-white"
                    : "bg-gray-200 text-purple-600 hover:bg-gray-300 dark:bg-zinc-800 dark:text-purple-400 dark:hover:bg-gray-700"
                    }`}
                >
                  {genre.name}
                  {!genre.unlocked && <span className="ml-2 text-sm">🔒</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Search + Sort */}
          <div className="w-full lg:w-[40%] flex flex-col-reverse md2:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-9 pr-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Sort Field Dropdown */}
            <div className="relative w-fit ml-auto flex gap-x-2 items-eenter">
              <div className="flex items-center gap-x-2">
                <label htmlFor="sorting" className="dark:text-gray-400 text-gray-700 text-nowrap">Sort by:</label>
                <select
                  name="sorting"
                  value={sortField}
                  onChange={handleSortFieldChange}
                  className=" pl-3 pr-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>

              {/* Sort Direction Toggle */}
              <button
                onClick={toggleSortDirection}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
              >
                <SortIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
