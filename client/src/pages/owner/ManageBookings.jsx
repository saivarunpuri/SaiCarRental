import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const { axios, currency, isOwner } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const fetchOwnerBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/bookings/owner");
      if (data.success) {
        setBookings(data.bookings);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerBookings();
  }, [isOwner]);

  const handleChangeBookingStatus = async (bookingId, newStatus) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        newStatus,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Bookings" subtitle="View all bookings" />
      <div className="w-full border-collapse overflow-hidden  border border-borderColor max-w-3xl rounded-md mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt={booking.car.brand}
                    className="w-12 h-12 rounded-md aspect-square object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {booking.car.brand} {booking.car.model}
                    </p>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-xs">
                    {booking.pickupDate.split("T")[0]} -{" "}
                    {booking.returnDate.split("T")[0]}
                  </span>
                </td>
                <td className="p-3">
                  <p className="font-medium">
                    {currency} {booking.price}
                  </p>
                </td>
                <td className="p-3 max-md:hidden">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                    Offline
                  </span>
                </td>
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <select
                      className="px-2 py-1.5 text-gray-500  border-gray-600 rounded-md outline-none border"
                      value={booking.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setBookings((prev) =>
                          prev.map((b, i) =>
                            i === index ? { ...b, status: newStatus } : b
                          )
                        );
                        handleChangeBookingStatus(booking._id, newStatus);
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-300"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
