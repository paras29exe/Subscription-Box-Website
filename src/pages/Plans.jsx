import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GenreCard from "../components/plans/GenreCard";
import { FaCheckCircle } from "react-icons/fa";
import PricingPlans from "../components/plans/PricingCard";
import Lottie from "lottie-react";
import comingSoonAnimation from "../assets/coming-soon.json";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const genres = [
  {
    name: "📚 Book Lover’s Box",
    genre: "books",
    description: "A curated selection of books and bookish goodies for every reader.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    name: "🍿 Snack Attack Box",
    genre: "snacks",
    description: "Indulge in a variety of gourmet and international snacks every month.",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaXBzfGVufDB8fDB8fHww",
  },
  {
    name: "🔌 TechMystery Box",
    genre: "tech",
    description: "Discover the coolest and latest tech gadgets straight to your doorstep.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    name: "💆‍♀️ Skin Care Box",
    genre: "skincare",
    description: "Pamper yourself with premium skincare products, from face masks to serums.",
    image: "https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg",
  },
];

const plans = [
  {
    name: "Basic",
    description: "1 curated box per month with random items from your selected genre.",
    features: ["✅ 1 monthly box", "🎁 Random curated items", "🚚 Standard shipping"],
    borderColor: "outline-green-500",
  },
  {
    name: "Premium",
    description: "1 random box + 1 customized box per month, where you can pick a few items.",
    features: [
      "✅ 1 random curated box",
      "🎁 1 customized box (choose some items)",
      "🚀 Priority shipping",
      "💎 Early access to new items",
    ],
    borderColor: "outline-blue-500",
  },
  {
    name: "Elite",
    description: "1 random box + 1 customized box + 1 surprise premium box with limited edition items.",
    features: [
      "✅ 1 random curated box",
      "🎁 1 customized box (fully personalized)",
      "🎉 1 surprise premium box",
      "🚀 Free express shipping",
      "🌟 Exclusive limited-edition items",
    ],
    borderColor: "outline-red-500",
  },
];

const genrePrices = [
  { genre: "books", prices: ["$19/mo", "$39/mo", "$59/mo"] },
  { genre: "snacks", prices: ["$15/mo", "$29/mo", "$39/mo"] },
  { genre: "tech", prices: ["$39/mo", "$69/mo", "$99/mo"] },
  { genre: "skincare", prices: ["$25/mo", "$49/mo", "$79/mo"] }, // Added Skincare pricing
];


export default function SubscriptionPlans() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planPrices, setPlanPrices] = useState([]);
  const plansRef = useRef(null);
  const btnRef = useRef(null)
  const navigate = useNavigate();
  const { setActiveGenre } = useCart()

  // Function to handle genre selection and scroll to plans
  const handleGenreSelect = (genre) => {
    setSelectedGenre(prev => prev === genre ? null : genre);
    setSelectedPlan(selectedGenre ? selectedPlan : null);

    !selectedGenre && setTimeout(() => {
      plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // Delay to ensure state updates first
  };

  const handlePlanSelect = () => {
    !selectedPlan && setTimeout(() => {
      btnRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }

  useEffect(() => {
    setPlanPrices(genrePrices.find((g) => g.genre === selectedGenre?.toLowerCase())?.prices || []);

  }, [selectedGenre]);

  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8 transition-all">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4 text-indigo-600 dark:text-indigo-400">Choose Your Subscription</h2>
      <h3 className="text-center text-gray-700 dark:text-gray-300 mb-3">Pick your favorite genre and subscription plan.</h3>

      {/* Step 1: Choose Genre */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 ">
        {genres.map((genre, index) => (
          <GenreCard
            key={index}
            plansRef={plansRef}
            genre={genre}
            index={index}
            selectedGenre={selectedGenre}
            handleGenreSelect={handleGenreSelect}
          />
        ))}

        {/* More to Come Card (Non-Interactive & Different Color) */}
        <motion.div
          className="p-1.5 sm:p-3 rounded-lg shadow-lg transition-all
           bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-800 dark:to-indigo-800"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-purple-500/30  rounded-lg">
            <Lottie className="w-3/4 aspect-square" animationData={comingSoonAnimation} />
          </div>
          <h3 className="text-base sm:text-xl font-bold mt-4 text-gray-800 dark:text-gray-200 text-center">More to Come Soon...</h3>
          <p className="text-xxs sm:text-xs lg:text-sm text-gray-700 dark:text-gray-300 mt-2 text-center">
            Stay tuned for exciting new genres coming your way!
          </p>
        </motion.div>
      </div>


      {/* Step 2: Choose Plan (Only Show After Genre is Selected) */}
      {selectedGenre && (
        <PricingPlans
          plans={plans}
          plansRef={plansRef}
          planPrices={planPrices}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          handlePlanSelect={handlePlanSelect}
        />
      )}

      {/* Step 3: Checkout Button */}
      {selectedGenre && selectedPlan && (
        <div className="text-center mt-12">
          <motion.button
            ref={btnRef}
            onClick={() => {
              setActiveGenre(selectedGenre)
              navigate("/orders")
            }}
            whileHover={{ scale: 1.1 }}
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all"
          >
            Proceed
          </motion.button>
        </div>
      )}
    </section>
  );
}