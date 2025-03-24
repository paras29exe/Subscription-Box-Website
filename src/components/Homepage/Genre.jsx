import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";

const genres = [
  {
    name: "📚 Book Lover’s Box",
    description:
      "Immerse yourself in the world of literature with a handpicked selection of bestselling novels, hidden gems, and literary surprises. Perfect for readers who love to escape into new stories!",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
    model: {
      modelPath: "/models/book.glb",
      scale: "0.011",
      cameraPosition: [0, 0, 6],
      objectPosition: [0, 0, 0]
    }
  },
  {
    name: "🍿 Snack Attack Box",
    description:
      "Experience a delightful mix of sweet, savory, and international snacks! Each box is packed with unique flavors, from gourmet chocolates to exotic chips, making every bite an adventure.",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaXBzfGVufDB8fDB8fHww",
    model: {
      modelPath: "https://res.cloudinary.com/paras-29/image/upload/v1741888832/college%20project/p8hgxxcrtsld9qz2arse.glb",
      scale: "4",
      cameraPosition: [5, 12, 7],
      objectPosition: [0, 0, 0]

    }
  },
  {
    name: "🔌 TechMystery Box",
    description:
      "Stay ahead of the curve with cutting-edge tech! This box delivers innovative gadgets, smart accessories, and the coolest new tech gear to keep you on the front line of innovation.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    model: {
      modelPath: "/models/tech.glb",
      scale: "18",
      cameraPosition: [0, 0, 5],
      objectPosition: [0, -1.5, 0]

    }
  },
  {
    name: "💆‍♀️ Skin Care Box",
    description:
      "Pamper yourself with luxurious skincare essentials! Each box includes high-quality face masks, serums, moisturizers, and beauty must-haves to keep your skin glowing and healthy.",
    image: "https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg",
    model: {
      modelPath: "https://res.cloudinary.com/paras-29/image/upload/v1741888609/college%20project/f3t311l5d0gilgzz3l5j.glb",
      scale: "0.15",
      cameraPosition: [0, 0, 5],
      objectPosition: [0, -1.5, 0]
    }
  },
];

const RotatingModel = ({ path, position, scale }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef();
  
  // const [rotationY, setRotationY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setRotationY(window.scrollY * 0.005); // Adjust sensitivity
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useFrame(() => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y = rotationY;
  //   }
  // });
  // console.log("hello")

  return <primitive ref={modelRef} object={scene} scale={scale} position={position} />;
};

export default function Genres() {
  return (
    <section className="py-16 bg-gray-200 dark:bg-gradient-to-r dark:from-gray-950 dark:via-zinc-900 dark:to-black text-gray-900 dark:text-gray-300 overflow-hidden transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-12">
        What we <span className="text-indigo-400 dark:text-indigo-500">Serve?</span>
      </h2>
      <div className="w-4/5 mx-auto flex flex-col gap-20 md:gap-4">
        {genres.map((genre, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
          >

            {/* use CANVAS AND 3D MODEL  */}

            <Canvas className="canvas-container !w-1/2 !aspect-[16/12]">
              <ambientLight intensity={1.5} position={[0, 2, 1]} />
              <directionalLight position={[-10, -12, -5]} intensity={2} />
              <directionalLight position={[0, 0, 5]} />
              <OrbitControls enablePan={false} enableZoom={false}  autoRotate autoRotateSpeed={3} />
              <PerspectiveCamera makeDefault position={genre.model.cameraPosition} />
              
              <Suspense fallback children={<p> Loading....</p>}>
              <RotatingModel path={genre.model.modelPath} scale={Number(genre.model.scale)} position={genre.model.objectPosition} />
              </Suspense>
            </Canvas>

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

/* 
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

*/