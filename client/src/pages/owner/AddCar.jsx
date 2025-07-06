import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    capacity: "",
    description: "",
    transmission: "",
    fuel_type: "",
    location: "",
    seating_capacity: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          seating_capacity: "",
          description: "",
          transmission: "",
          fuel_type: "",
          location: "",
          category: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add Car" subtitle="Add a new car to your fleet" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/*Car Image*/}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="car"
              className="h-14 rounded cursor-pointer object-cover"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </div>
        {/*Car Brand & Model  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="">Brand</label>
            <input
              type="text"
              placeholder="Enter car brand"
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Model</label>
            <input
              type="text"
              placeholder="Enter car model"
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>
        {/*Car Year,pricePerDay,capacity*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="">Year</label>
            <input
              type="number"
              placeholder="Enter car year"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Price Per Day ({currency})</label>
            <input
              type="number"
              placeholder={`Enter car price per day in ${currency}`}
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Category</label>
            <select
              name="category"
              id="category"
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>
        {/*Car Description,transmission,fuelType,seatingCapacity*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="">Transmission</label>
            <select
              name="transmission"
              id="transmission"
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Fuel Type</label>
            <select
              name="fuelType"
              id="fuelType"
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Seating Capacity</label>
            <input
              type="number"
              placeholder="Enter car seating capacity"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              required
              className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
            />
          </div>
        </div>
        {/*Car Location*/}
        <div className="flex flex-col w-full">
          <label htmlFor="">Location</label>
          <select
            name="location"
            id="location"
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
          >
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
            <option value="Miami">Miami</option>
            <option value="San Francisco">San Francisco</option>
          </select>
        </div>
        {/*Car Description*/}
        <div className="flex flex-col w-full">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            id="description"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            required
            className="px-3 py-1 mt-1 border border-gray-200 rounded-md outline-none"
          />
        </div>
        <button className="flex items-center gap-2 justify-center bg-blue-500 text-white px-4 py-2 rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="add" />
          {isLoading ? "Adding..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
