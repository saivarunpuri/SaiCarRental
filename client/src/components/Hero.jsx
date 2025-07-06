import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { navigate, pickupDate, returnDate, setPickupDate, setReturnDate } =
    useAppContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  // Animation variants for sequential rendering
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for sudden stop
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen bg-light text-center px-4 py-8"
    >
      <div className="w-full max-w-6xl">
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6"
        >
          Luxury Cars On Rent
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-lavender-700 font-semibold mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Elevate your journey with Varun Devlops – where luxury, comfort, and
          style drive every mile.
        </motion.p>

        <motion.form
          variants={formVariants}
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-full shadow-2xl p-4 md:p-5 mb-6 md:mb-8 border border-lavender-200 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
            {/* Pickup Location */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-lavender-700 text-left">
                Pickup Location
              </label>
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm border border-lavender-300 rounded-full focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200 bg-white/80 text-gray-900 placeholder-lavender-400"
              >
                <option value="">Select Location</option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date */}
            <div className="space-y-1">
              <label
                htmlFor="pickupDate"
                className="block text-xs font-semibold text-lavender-700 text-left"
              >
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm border border-lavender-300 rounded-full focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200 bg-white/80 text-gray-900"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            {/* Return Date */}
            <div className="space-y-1">
              <label
                htmlFor="returnDate"
                className="block text-xs font-semibold text-lavender-700 text-left"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm border border-lavender-300 rounded-full focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500 transition-all duration-200 bg-white/80 text-gray-900"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r from-lavender-600 to-lavender-700 hover:from-lavender-700 hover:to-lavender-800 font-semibold py-1.5 md:py-2 px-3 md:px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 shadow-lg hover:shadow-xl text-xs md:text-sm
                  ${
                    !pickupLocation && !pickupDate && !returnDate
                      ? "text-gray-400 italic"
                      : "text-white"
                  }`}
                disabled={!pickupLocation && !pickupDate && !returnDate}
              >
                <img
                  src={assets.search_icon}
                  alt="search"
                  className={`w-3 h-3 md:w-4 md:h-4 ${
                    !pickupLocation && !pickupDate && !returnDate
                      ? "opacity-60"
                      : ""
                  }`}
                />
                {!pickupLocation && !pickupDate && !returnDate
                  ? "Search for your dream car…"
                  : "Search Cars"}
              </motion.button>
            </div>
          </div>
        </motion.form>

        <motion.div variants={imageVariants} className="flex justify-center">
          <img
            src={assets.main_car}
            alt="Luxury Car"
            className="max-w-full h-auto max-h-96 md:max-h-112 object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
