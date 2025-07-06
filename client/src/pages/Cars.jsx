import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useAppContext } from "../context/AppContext";

const Cars = () => {
  const { cars, carsLoading } = useAppContext();
  const [input, setInput] = useState("");

  // Filter cars based on search input
  const filterCarsByInput = (carsToFilter) => {
    if (!input.trim()) return carsToFilter;

    return carsToFilter.filter(
      (car) =>
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.fuel_type?.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission?.toLowerCase().includes(input.toLowerCase()) ||
        car.description?.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Get the final filtered cars - show all cars from database
  const filteredCars = filterCarsByInput(cars);

  return (
    <div>
      <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title
          title="Available Cars"
          subtitle="Explore our wide range of cars"
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search by brand, model, category, fuel type, or transmission"
            className="w-full h-full outline-none text-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img src={assets.filter_icon} alt="filter" className="w-5 h-5 ml-2" />
        </div>
      </div>
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length}{" "}
          {filteredCars.length === 1 ? "Car" : "Cars"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {carsLoading ? (
            <div className="col-span-full text-center">
              <p className="text-gray-500">Loading cars...</p>
            </div>
          ) : filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div key={car._id || index}>
                <CarCard car={car} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No cars found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
