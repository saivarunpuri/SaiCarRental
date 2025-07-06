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

  // Show loading state if cars are not yet loaded
  if (carsLoading || !cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading featured vehicles...</p>
        </div>
      </div>
    );
  }

  // Animation variants for smooth staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div variants={titleVariants}>
        <Title
          title="Featured Vehicles"
          subtitle="Explore Our Section for the best cars for next adventure"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            key={car._id}
            variants={cardVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        variants={buttonVariants}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#f8f9fa",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 cursor-pointer rounded-md mt-18 border border-borderColor transition-colors duration-300"
      >
        Explore All Cars
        <motion.img
          src={assets.arrow_icon}
          alt="arrow"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </motion.div>
  );
};

export default FeautreSection;
