import React from "react";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeautreSection = () => {
  const navigate = useNavigate();
  const { cars, carsLoading } = useAppContext();

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
    <div className="flex flex-col items-center py-12 px-4 md:py-24 md:px-6 lg:px-16 xl:px-24">
      <div className="w-full max-w-7xl">
        <Title
          title="Featured Vehicles"
          subtitle="Explore Our Section for the best cars for next adventure"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
          {cars.slice(0, 6).map((car) => (
            <div
              key={car._id}
              className="transform transition-transform duration-300 hover:-translate-y-2"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <button
            onClick={() => {
              navigate("/cars");
              window.scrollTo(0, 0);
            }}
            className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 cursor-pointer rounded-md border border-gray-300 transition-colors duration-300 bg-white"
          >
            Explore All Cars
            <img
              src={assets.arrow_icon}
              alt="arrow"
              className="w-4 h-4 animate-pulse"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeautreSection;
