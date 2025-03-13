import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const genres = [
  {
    name: "📚 Book Lover’s Box",
    description:
      "Immerse yourself in the world of literature with a handpicked selection of bestselling novels, hidden gems, and literary surprises. Perfect for readers who love to escape into new stories!",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
  },
  {
    name: "🍿 Snack Attack Box",
    description:
      "Experience a delightful mix of sweet, savory, and international snacks! Each box is packed with unique flavors, from gourmet chocolates to exotic chips, making every bite an adventure.",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaXBzfGVufDB8fDB8fHww",
  },
  {
    name: "🔌 Tech & Gadgets Box",
    description:
      "Stay ahead of the curve with cutting-edge tech! This box delivers innovative gadgets, smart accessories, and the coolest new tech gear to keep you on the front line of innovation.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    name: "💆‍♀️ Skin Care Box",
    description:
      "Pamper yourself with luxurious skincare essentials! Each box includes high-quality face masks, serums, moisturizers, and beauty must-haves to keep your skin glowing and healthy.",
    image: "https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg",
  },
];

export default function Genres() {
  return (
    <section className="py-16 bg-gray-200 dark:bg-zinc-900 text-gray-900 dark:text-gray-300 overflow-hidden transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-12">
        What we <span className="text-indigo-400 dark:text-indigo-500">Serve?</span>
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {genres.map((genre, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            {/* 3D Tilt + Zoom Effect */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              gyroscope={true}
              perspective={1000}
              className="w-full md:w-1/2"
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-indigo-500 bg-gradient-to-br from-indigo-700 to-purple-500 dark:from-indigo-800 dark:to-purple-600 p-1"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full z-20 h-64 object-cover rounded-2xl transition-all duration-300 hover:scale-110"
                />
              </motion.div>
            </Tilt>

            {/* Genre Text */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left"
              initial={{ x: -100, opacity: 0, scale: 0.8 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-indigo-400 dark:text-indigo-500">
                {genre.name}
              </h3>
              <p className="mt-4 text-gray-900 dark:text-gray-400 text-lg font-semibold">{genre.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
