import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { axios, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
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
    user && fetchBookings();
  }, [user]);

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  if (isLoading) {
    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
        <Title
          title="My Bookings"
          subtitle="Manage your bookings"
          align="left"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-gray-300"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Container */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
        <Title
          title="My Bookings"
          subtitle="Manage your bookings"
          align="left"
        />
        {/* Bookings List Container */}
        <div>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bookings found</p>
              <p className="text-gray-400 text-sm mt-2">
                You haven't made any bookings yet.
              </p>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <React.Fragment key={booking._id || index}>
                {/* Individual Booking Card */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor mt-5 first:mt-12 rounded-lg">
                  {/* Car Image & Info Section */}
                  <div className="md:col-span-1">
                    <div className="rounded-md overflow-hidden mb-3">
                      <img
                        src={booking.car?.image || "placeholder-image-url"}
                        alt={`${booking.car?.brand || "Car"} ${
                          booking.car?.model || ""
                        }`}
                        className="w-full h-auto aspect-video object-cover"
                        onError={(e) => {
                          e.target.src = "placeholder-image-url";
                        }}
                      />
                    </div>
                    <p className="text-gray-500">
                      {booking.car?.brand || "Unknown"}{" "}
                      {booking.car?.model || "Car"}
                    </p>
                    <p className="text-gray-500">
                      {booking.car?.year || "N/A"} .{" "}
                      {booking.car?.category || "N/A"} .{" "}
                      {booking.car?.location || "N/A"}
                    </p>
                  </div>

                  {/* Booking Details Section */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <p className="px-3 py-1.5 bg-light rounded">
                        Booking #{index + 1}
                      </p>
                      <p
                        className={`px-3 py-1 text-xs rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-400/15 text-green-500"
                            : booking.status === "cancelled"
                            ? "bg-red-500/15 text-red-500"
                            : "bg-yellow-400/15 text-yellow-500"
                        }`}
                      >
                        {booking.status || "pending"}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <img
                        src={assets.calendar_icon_colored}
                        alt=""
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <p className="text-gray-500">Rental Period</p>
                        <p>
                          {formatDate(booking.pickupDate)} To{" "}
                          {formatDate(booking.returnDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <img
                        src={assets.location_icon_colored}
                        alt=""
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <p className="text-gray-500">Pick-up Location</p>
                        <p>{booking.car?.location || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                  {/* Price & Date Section */}
                  <div className="md:col-span-1 flex flex-col justify-between gap-6">
                    <div>
                      <p className="text-gray-500">Total Price</p>
                      <h1 className="text-2xl font-semibold text-primary">
                        {currency} {booking.price || 0}
                      </h1>
                      <p>Booked On {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
