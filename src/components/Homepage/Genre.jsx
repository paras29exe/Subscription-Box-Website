import React from 'react';
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const genres = [
  {
    name: "📚 Book Lover’s Box",
    description:
      "Immerse yourself in the world of literature with a handpicked selection of bestselling novels, hidden gems, and literary surprises. Perfect for readers who love to escape into new stories!",
    image: "https://res.cloudinary.com/paras-29/image/upload/v1743050244/college%20project/HomePageImages/gund2mstae0oe9fjcyrc.png",
  },
  {
    name: "🍿 Snack Attack Box",
    description:
      "Experience a delightful mix of sweet, savory, and international snacks! Each box is packed with unique flavors, from gourmet chocolates to exotic chips, making every bite an adventure.",
    image: "https://res.cloudinary.com/paras-29/image/upload/v1743050245/college%20project/HomePageImages/e9fqqmh92oroodockura.png",
  },
  {
    name: "🔌TechMystery Box",
    description:
      "Stay ahead of the curve with cutting-edge tech! This box delivers innovative gadgets, smart accessories, and the coolest new tech gear to keep you on the front line of innovation.",
    image: "https://res.cloudinary.com/paras-29/image/upload/v1743050244/college%20project/HomePageImages/mlw4p4prdbu4drgfi9ag.png",
  },
  {
    name: "💆‍♀️ Skin Care Box",
    description:
      "Pamper yourself with luxurious skincare essentials! Each box includes high-quality face masks, serums, moisturizers, and beauty must-haves to keep your skin glowing and healthy.",
    image: "https://res.cloudinary.com/paras-29/image/upload/v1743050244/college%20project/HomePageImages/q71gtlvep1rcph37yodt.png",
  },
];

export default function Genres() {
  return (
    <section className="py-16  dark:bg-gradient-to-r dark:from-gray-950 dark:via-zinc-900 dark:to-black text-gray-900 dark:text-gray-300 transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-16">
        What we <span className="text-indigo-400 dark:text-indigo-500">Serve?</span>
      </h2>

      <div className="w-4/5 mx-auto flex flex-col gap-y-24 md2:gap-y-4">
        {genres.map((genre, index) => (
          <div
            key={index}
            className={`relative flex md2:gap-20 gap-4 flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse" }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
              className='w-full md:w-1/2'
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                gyroscope={true}
                perspective={1000}
                className="w-full  flex justify-center"
              >
                <motion.div
                  className="relative flex flex-col items-center justify-center rounded-2xl p-4 md:p-8 w-3/4 md:w-[85%] aspect-square mx-auto overflow-hidden bg-transparent"
                  animate={{ y: [15, -15, 15] }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                  viewport={{ once: true }}
                >
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover mix-blend-multiply rounded-2xl transition-all duration-300 hover:scale-105"
                  />
                </motion.div>
              </Tilt>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-center md:text-left px-4">
              <h3 className="lg:text-5xl text-3xl font-bold text-indigo-400 dark:text-indigo-500">
                {genre.name}
              </h3>
              <p className="mt-4 text-gray-900 dark:text-gray-500 text-lg lg:text-xl">
                {genre.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
