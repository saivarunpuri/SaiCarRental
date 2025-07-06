import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Varun Devlops made my trip unforgettable! The car was spotless, luxurious, and the booking process was seamless. I'll definitely rent from them again!",
    },
    {
      id: 2,
      name: "Liam Johnson",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "Best car rental experience ever! The team at Varun Devlops provided top-notch service and a fantastic selection of vehicles. Highly recommended for anyone seeking comfort and style.",
    },
  ];

  // Animation variants for smooth staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-28 px-6 md:px-16 lg:px-24 xl:px-44"
    >
      <motion.div variants={titleVariants}>
        <Title
          title="Customer Testimonials"
          subtitle="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-xl shadow-lg transition-all duration-500"
          >
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <div>
                <p className="text-xl font-semibold">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <motion.img
                    key={index}
                    src={assets.star_icon}
                    alt="star"
                    variants={starVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  />
                ))}
            </motion.div>

            <motion.p
              className="text-gray-500 max-w-90 mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              "{testimonial.testimonial}"
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Testimonals;
