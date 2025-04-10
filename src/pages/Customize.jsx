import { useState, useEffect } from "react";
import GenreTabs from "../components/Customise/GenreTabs";
import ItemCard from "../components/Customise/ItemCard";
import { useCart } from "../context/cartContext";
import { useSelector } from "react-redux";

// Mock data for genres and items
const genres = [
  {
    id: "books",
    name: "Books",
    unlocked: true,
    subscribed: true,
    items: [
      {
        id: 1,
        name: "Mystery Novel",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww",
        price: 14.99,
        rating: 4.5,
        availability: "In Stock",
      },
      {
        id: 2,
        name: "Sci-Fi Thriller",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8fDB8fHww",
        price: 19.99,
        rating: 4.7,
        availability: "In Stock",
      }
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    unlocked: false,
    subscribed: false,
    items: [
      {
        id: 3,
        name: "Gourmet Chocolates",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlc3xlbnwwfHwwfHx8MA%3D%3D",
        price: 9.99,
        rating: 4.8,
        availability: "In Stock",
      },
      {
        id: 4,
        name: "Organic Chips",
        image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaXBzfGVufDB8fDB8fHww",
        price: 5.99,
        rating: 4.3,
        availability: "Out of Stock",
      },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    unlocked: false,
    subscribed: false,
    items: [
      {
        id: 5,
        name: "Wireless Earbuds",
        image: "https://www.apple.com/v/airpods-pro/m/images/meta/og__eui2mpgzwyaa_specs.png",
        price: 129.99,
        rating: 4.6,
        availability: "In Stock",
      },
      {
        id: 6,
        name: "Smartwatch",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNtYXJ0d2F0Y2h8ZW58MHx8MHx8fDA%3D",
        price: 199.99,
        rating: 4.9,
        availability: "In Stock",
      },
    ],
  },
  {
    id: "skincare",
    name: "Skin-Care",
    unlocked: false,
    subscribed: false,
    items: [
      {
        id: 7,
        name: "Face Serum",
        image: "https://images-eu.ssl-images-amazon.com/images/I/51YDAPq1JSL._AC_UL600_SR600,600_.jpg",
        price: 24.99,
        rating: 4.4,
        availability: "In Stock",
      },
      {
        id: 8,
        name: "Sunscreen",
        image: "https://cdn.kindlife.in/images/detailed/160/abc.jpg?t=1713956514",
        price: 19.99,
        rating: 4.2,
        availability: "Out of Stock",
      },
    ],
  },
];

export default function Customize() {
  const { activeGenre, setActiveGenre } = useCart();
  const { userData } = useSelector(state => state.auth);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ field: "name", direction: "asc" });

  // Get the current genre's items
  useEffect(() => {
    const currentGenreItems = genres.find(genre => genre.id === activeGenre)?.items || [];
    
    // Apply search filter
    let items = currentGenreItems;
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    items = [...items].sort((a, b) => {
      if (sortConfig.field === "name") {
        return sortConfig.direction === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortConfig.direction === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
    });
    
    setFilteredItems(items);
  }, [activeGenre, searchTerm, sortConfig]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field, direction) => {
    setSortConfig({ field, direction });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-xl sm:text-3xl lg:text-5xl mb-2 font-bold text-center text-indigo-600 dark:text-indigo-400">
        Customize Your Box
      </h1>
      
      <div className="flex flex-col gap-4">
        {/* Genre Tabs with Search and Sort */}
        <GenreTabs
          genres={genres}
          selectedGenre={activeGenre}
          setSelectedGenre={setActiveGenre}
          onSearch={handleSearch}
          onSort={handleSort}
        />


        {/* Items Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 lg:gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              userData={userData}
              item={item}
              genre={activeGenre}
              isUnlocked={genres.find(genre => genre.id === activeGenre).unlocked}
            />
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No items found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}