import React from "react";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const FeautreSection = () => {
  const navigate = useNavigate();
  const { cars, carsLoading } = useAppContext();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  // Show loading state if cars are not yet loaded
  if (carsLoading || !cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 px-4 md:py-24 md:px-6 lg:px-16 xl:px-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">
            Loading featured vehicles...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="flex flex-col items-center py-12 px-4 md:py-24 md:px-6 lg:px-16 xl:px-24"
    >
      <div className="w-full max-w-7xl">
        <motion.div variants={titleVariants}>
          <Title
            title="Featured Vehicles"
            subtitle="Explore Our Section for the best cars for next adventure"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12"
        >
          {cars.slice(0, 4).map((car) => (
            <motion.div
              key={car._id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={buttonVariants}
          className="flex justify-center mt-8 md:mt-12"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/cars");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 cursor-pointer rounded-md border border-gray-300 transition-colors duration-300 bg-white"
          >
            Explore All Cars
            <motion.img
              src={assets.arrow_icon}
              alt="arrow"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-4"
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeautreSection;
