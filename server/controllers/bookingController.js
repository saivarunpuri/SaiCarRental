import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

//Function to check if the car is available for the given dates
export const checkAvailability = async (car, pickupDate, returnDate) => {
  try {
    // Check for overlapping bookings
    const bookings = await Booking.find({
      car: car._id || car,
      $or: [
        // New booking starts during existing booking
        {
          pickupDate: { $lte: new Date(pickupDate) },
          returnDate: { $gte: new Date(pickupDate) },
        },
        // New booking ends during existing booking
        {
          pickupDate: { $lte: new Date(returnDate) },
          returnDate: { $gte: new Date(returnDate) },
        },
        // New booking completely contains existing booking
        {
          pickupDate: { $gte: new Date(pickupDate) },
          returnDate: { $lte: new Date(returnDate) },
        },
      ],
    });

    return bookings.length === 0;
  } catch (error) {
    console.error("Error checking availability:", error);
    return false;
  }
};

// Api to check Availabilty of cars for te given Date and Locaiton
export const checkAvailabilityForLocation = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Location, pickup date, and return date are required",
      });
    }

    //fetch ALl cars
    const cars = await Car.find({ location, isAvailable: true });

    if (cars.length === 0) {
      return res.status(200).json({
        success: true,
        availableCars: [],
        message: "No cars found in this location",
      });
    }

    //check availability for each car using promise.all
    const availabilityCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car, pickupDate, returnDate);
      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(availabilityCarsPromise);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.status(200).json({
      success: true,
      availableCars: availableCars,
    });
  } catch (error) {
    console.error("Error in checkAvailabilityForLocation:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to book a car
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.status(400).json({ message: "Car is not available" });
    }
    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({ message: "Car not found" });
    }
    //Calculate the price
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;
    const booking = await Booking.create({
      car,
      user: _id,
      owner: carData.owner,
      pickupDate: picked,
      returnDate: returned,
      price,
    });
    res.status(200).json({
      success: true,
      message: "Car booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//List Uer Bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//List Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const { bookingId, newStatus } = req.body;

    if (!bookingId || !newStatus) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and new status are required",
      });
    }

    // Validate status values
    const allowedStatuses = ["pending", "confirmed", "cancelled"];
    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to change the status of this booking",
      });
    }

    // Update the status
    booking.status = newStatus;
    await booking.save();

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${newStatus}`,
      booking,
    });
  } catch (error) {
    console.error("Change booking status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
