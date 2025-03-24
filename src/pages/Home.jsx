import React, { lazy, Suspense } from "react";
import Hero from "../components/Homepage/Hero";
import HowItWorks from "../components/Homepage/HowItWorks";
import Testimonials from "../components/Homepage/Testimonials";
import FAQ from "../components/Homepage/FAQ";
// import Genres from "../components/Homepage/Genre";

// Lazy load Genres to prevent it from blocking the initial load
const Genres = lazy(() => import("../components/Homepage/Genre"));

function Home() {
  return (
    <div className="flex flex-col gap-4 overflow-x-hidden scroll-smooth">
      <Hero />

      {/* Show a fallback while Genres is loading */}
      <Suspense fallback={<div className="text-center text-gray-400">Loading genres...</div>} >
        <Genres />
      </Suspense>

      <HowItWorks />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
