import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {cars,axios,pickupDate,returnDate,setPickupDate,setReturnDate}=useAppContext()
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
        const {data}=await axios.post("/api/bookings/create",{
            car:id,
            pickupDate,
            returnDate
        })
        if(data.success){
            toast.success(data.message)
            navigate("/my-bookings")
        }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };
  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars,id]);
  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 cursor-pointer"
      >
        <img src={assets.arrow_icon} alt="" />
        Back to all cars
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ">
        {/* left side */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                {car.category} . {car.year}
              </p>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-light p-4 rounded-lg items-center"
                >
                  <img src={item.icon} alt="" className="h-5 mb-2" />
                  {item.text}
                </div>
              ))}
            </div>
            {/*Description*/}
            <div className="mt-6">
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-600 text-sm">{car.description}</p>
            </div>
            <div className="mt-6">
              <h1 className="text-xl font-medium mb-3">Feauters</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Air Conditioning",
                  "Bluetooth Connectivity",
                  "Power Steering",
                  "360 Camera",
                  "Power Windows",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    <p className="text-gray-600 text-sm">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleBooking}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500"
        >
          <p className="flex items-center justify-between text-2xl font-semibold text-gray-700">
            {currency} {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">Per Day</span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup">Pickup Date</label>
            <input
              type="date"
              id="pickup"
              className=" px-3 py-2 rounded-lg border border-borderColor ml-3"
              min={new Date().toISOString().split("T")[0]}
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="dropoff">Dropoff Date</label>
            <input
              type="date"
              id="dropoff"
              className=" px-3 py-2 rounded-lg border border-borderColor ml-3"
              min={new Date().toISOString().split("T")[0]}
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <button className="w-full bg-primary hover:bg-primary-dull transition-all duration-300 text-white py-2 rounded-xl font-medium cursor-pointer">
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit required during reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
