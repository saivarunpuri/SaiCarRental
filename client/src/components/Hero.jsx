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
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-screen bg-light text-center"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-semibold md:text-5xl"
      >
        Luxary Cars On Rent
      </motion.h1>

      <motion.form
        variants={formVariants}
        onSubmit={handleSearch}
        action=""
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] mt-10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col gap-2 items-start">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation
                ? pickupLocation
                : "Please Select Pickup Location"}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input
              type="date"
              id="pickupDate"
              required
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              required
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary max-sm:mt-4 text-white px-9 py-3 hover:bg-primary-dull cursor-pointer rounded-full"
          >
            <img src={assets.search_icon} alt="search" />
            Search
          </motion.button>
        </div>
      </motion.form>

      <motion.img
        variants={imageVariants}
        src={assets.main_car}
        alt="car"
        className="max-h-74"
      />
    </motion.div>
  );
};

export default Hero;
