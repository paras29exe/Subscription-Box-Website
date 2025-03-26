import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { name: "Narendra Modi", review: "Absolutely love my subscription box!", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKqIg3pZGnGVuDbO7piYwe2EBzDMOcMohDv5sIWQ-tnD7ruRla" },
  { name: "Dr. Avinash Sharma", review: "Box Dekh kar Mazza aagya! Woww", image: "/sir.jpg" },
  { name: "Virat Kohli", review: "Every month is a new surprise. Highly recommend!", image: "https://documents.bcci.tv/resizedimageskirti/164_compress.png" },
  { name: "Mr. Kamal Thakur", review: "As a teacher this box was a surprise test to me!", image: "https://media.licdn.com/dms/image/v2/D5603AQE-pSKaa--KBQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727273849266?e=1746662400&v=beta&t=z9fkKU_TNVx6E3eoYESP0zIRWuRzBgMMCr55o5ZMWGM" },
];

export default function Testimonials() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="py-10  bg-gray-200 dark:bg-gray-900">
      <h2 className="text-3xl md:text-4xl px-4 font-bold text-center text-gray-900 dark:text-gray-200">
        What Our Premium Customers Say
      </h2>
      <div className="mt-8 w-full md:w-4/5 md:px-0 px-4 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="w-full  bg-white dark:bg-gray-800 cursor-pointer p-4 md:p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50}}
            whileInView={{ opacity: 1, y: 0}}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            // animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 , duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mx-auto overflow-hidden bg-slate-200 w-16 rounded-full aspect-square">
              <img src={testimonial.image} alt={testimonial.name} className="w-full scale-125 mx-auto rounded-full object-cover object-top" />
            </div>
            <p className="mt-4 text-gray-700 text-xs lg:text-sm dark:text-gray-300">"{testimonial.review}"</p>
            <h4 className="mt-2 font-semibold text-sm lg:text-base text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
