import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Banner = () => {
  // Animation variants for smooth staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-7 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9C6FF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <motion.div variants={containerVariants} className="text-white">
        <motion.h2 variants={textVariants} className="text-3xl font-medium">
          Do you Own Luxary Car?
        </motion.h2>

        <motion.p variants={textVariants} className="mt-2">
          Monetize your car with us and earn extra income
        </motion.p>

        <motion.p variants={textVariants} className="max-w-130">
          we take care of the maintenance and repairs,insurance
          ,driver-verification and secure payments
        </motion.p>

        <motion.button
          variants={buttonVariants}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#f1f5f9",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer"
        >
          List Your Car
        </motion.button>
      </motion.div>

      <motion.img
        variants={imageVariants}
        src={assets.banner_car_image}
        alt="Luxury car"
        className="max-h-45 mt-10"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      />
    </motion.div>
  );
};

export default Banner;
