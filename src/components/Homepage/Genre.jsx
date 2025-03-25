import React from 'react';
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt"

const genres = [
  {
    name: "📚 Book Lover’s Box",
    description:
      "Immerse yourself in the world of literature with a handpicked selection of bestselling novels, hidden gems, and literary surprises. Perfect for readers who love to escape into new stories!",
    image: "https://www.freeiconspng.com/thumbs/cartoon-characters-png/cartoon-characters-spongebob-reading-book-png-0.png",

  },
  {
    name: "🍿 Snack Attack Box",
    description:
      "Experience a delightful mix of sweet, savory, and international snacks! Each box is packed with unique flavors, from gourmet chocolates to exotic chips, making every bite an adventure.",
    image:
      "/src/assets/images/snacks.png",

  },
  {
    name: "🔌 TechMystery Box",
    description:
      "Stay ahead of the curve with cutting-edge tech! This box delivers innovative gadgets, smart accessories, and the coolest new tech gear to keep you on the front line of innovation.",
    image: "/src/assets/images/heroBox.png",

  },
  {
    name: "💆‍♀️ Skin Care Box",
    description:
      "Pamper yourself with luxurious skincare essentials! Each box includes high-quality face masks, serums, moisturizers, and beauty must-haves to keep your skin glowing and healthy.",
    image: "/src/assets/images/skincare.png",

  },
];

export default function Genres() {
  return (
    <section className="py-16 bg-gray-200 dark:bg-gradient-to-r dark:from-gray-950 dark:via-zinc-900 dark:to-black text-gray-900 dark:text-gray-300 overflow-hidden transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-16">
        What we <span className="text-indigo-400 dark:text-indigo-500">Serve?</span>
      </h2>
      <div className="w-4/5 mx-auto flex flex-col gap-24 md:gap-4">

        {genres.map((genre, index) => (
          <motion.div
            key={index}
            className={`relative flex md:gap-20 gap4 flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
          >

            {/* use Png images to look like 3d  */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              gyroscope={true}
              perspective={1000}
              className="w-full md:w-1/2"
            >
              <motion.div
                className="relative flex flex-col items-center justify-center rounded-2xl p-4 md:p-8 w-fit h-fit mx-auto overflow-hidden bg-transparent"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                {/* Floating Image */}
                <motion.img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full z-20 object-contain mix-blend-multiply rounded-2xl transition-all duration-300 hover:scale-110"
                  animate={{ y: [-40, 40, -40] }} // Subtle floating effect
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />

              </motion.div>

            </Tilt>

            {/* Genre Text */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left"
              initial={{ x: (50 * ((-1) ** index)), opacity: 0, scale: 0.9 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-thin text-indigo-400 dark:text-indigo-500">
                {genre.name}
              </h3>
              <p className="mt-4 text-gray-900 dark:text-gray-400 text-lg ">{genre.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
