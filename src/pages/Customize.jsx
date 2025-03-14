import { useState } from "react";
import GenreTabs from "../components/BoxesPage/GenreTabs";
import ItemCard from "../components/BoxesPage/ItemCard";
import SelectedItemsCount from "../components/BoxesPage/SelectedItemsCount";

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
        },
      ],
    },
    {
      id: "snacks",
      name: "Snacks",
      unlocked: true,
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
          image: "https://images.unsplash.com/photo-1606220945772-9e4291fe4d8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
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
      id: "selfcare",
      name: "Self-Care",
      unlocked: false,
      subscribed: false,
      items: [
        {
          id: 7,
          name: "Aromatherapy Candle",
          image: "https://images.unsplash.com/photo-1603394633860-c1ba5c5355e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D",
          price: 24.99,
          rating: 4.4,
          availability: "In Stock",
        },
        {
          id: 8,
          name: "Face Mask Kit",
          image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2UlMjBtYXNrfGVufDB8fDB8fHww",
          price: 19.99,
          rating: 4.2,
          availability: "Out of Stock",
        },
      ],
    },
  ];

export default function Customize() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);
  const [selectedItems, setSelectedItems] = useState({
    books: [],
    snacks: [],
    tech: [],
    selfcare: [],
  });

  const handleItemSelect = (item, genreId) => {
    setSelectedItems((prev) => {
      const genreItems = prev[genreId];
      if (genreItems.includes(item)) {
        return {
          ...prev,
          [genreId]: genreItems.filter((i) => i.id !== item.id),
        };
      } else {
        return { ...prev, [genreId]: [...genreItems, item] };
      }
    });
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Customize Your Box
      </h1>

      {/* Selected Items Count by Genre */}
      <SelectedItemsCount genres={genres} selectedItems={selectedItems} />

      {/* Genre Tabs */}
      <GenreTabs
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genres
          .find((g) => g.id === selectedGenre)
          .items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={selectedItems[selectedGenre].some(
                (i) => i.id === item.id
              )}
              isUnlocked={genres.find((g) => g.id === selectedGenre).unlocked}
              onAddToBox={() => handleItemSelect(item, selectedGenre)}
              onRemoveFromBox={() => handleItemSelect(item, selectedGenre)}
            />
          ))}
      </div>
    </div>
  );
}