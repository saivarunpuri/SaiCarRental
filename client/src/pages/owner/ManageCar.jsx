import React, { useState, useEffect } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageCar = () => {
  const { isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  const toggleCarAvailability = async (carId) => {
    try {
      const { data } = await axios.post(`/api/owner/toggle-car/${carId}`);
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = toast(
        (t) => (
          <div className="flex items-center gap-2">
            <span>Are you sure you want to delete this car?</span>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDeleteConfirm(carId);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            >
              No
            </button>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteConfirm = async (carId) => {
    try {
      const { data } = await axios.post(`/api/owner/delete-car/${carId}`);
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subtitle="View all listed cars,update or delete them"
      />
      <div className="w-full border-collapse overflow-hidden  border border-borderColor max-w-3xl rounded-md mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 max-md:hidden font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="w-12 h-12 rounded-md aspect-square object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}{" "}
                    </p>
                    <p className="text-gray-500">
                      {car.seating_capacity} {car.transmission}{" "}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">
                  <p className="font-medium">${car.pricePerDay}/day</p>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      car.isAvailable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3 flex items-center">
                  <img
                    src={
                      car.isAvailable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="edit"
                    className="cursor-pointer"
                    onClick={() => toggleCarAvailability(car._id)}
                  />
                  <img
                    src={assets.delete_icon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => deleteCar(car._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCar;
