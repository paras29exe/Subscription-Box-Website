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
      id: "selfcare",
      name: "Self-Care",
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
    <div className="p-4 min-h-screen md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
        Customize Your Box
      </h1>

      {/* Selected Items Count by Genre */}
      {/* <SelectedItemsCount genres={genres} selectedItems={selectedItems} /> */}

      {/* Genre Tabs */}
      <GenreTabs
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4">
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