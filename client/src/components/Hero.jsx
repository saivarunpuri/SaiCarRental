import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light text-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 md:mb-8">
          Luxury Cars On Rent
        </h1>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 md:mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">
                Pickup Location
              </label>
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
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
            <div className="space-y-2">
              <label
                htmlFor="pickupDate"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label
                htmlFor="returnDate"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-5 h-5"
                />
                Search Cars
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center">
          <img
            src={assets.main_car}
            alt="Luxury Car"
            className="max-w-full h-auto max-h-96 md:max-h-112 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
