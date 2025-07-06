import User from "../models/user.js";
import Car from "../models/Car.js";
import imagekit from "../configs/imagekit.js";
import fs from "fs";
import Booking from "../models/Booking.js";
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { role: "owner" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Now you can list your cars",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to list cars
export const addCars = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Fix: Use the filePath from response and create proper URL
    var optmizedImageUrl = imagekit.url({
      path: response.filePath, // Use filePath instead of url
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      transformation: [
        { width: "1280" }, //Resize to 1280px
        { quality: "auto" }, //Auto Compression
        { format: "webp" }, //Convert to webp format
      ],
    });

    const image = optmizedImageUrl;
    await Car.create({ ...car, owner: _id, image });
    res.status(200).json({ success: true, message: "Car added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;
    const car = await Car.findById(carId);
    //Checking if the car is owned by the user
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        message:
          "You are not authorized to toggle the availability of this car",
      });
    }
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.status(200).json({
      success: true,
      message: "Car availability toggled successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.params;
    const car = await Car.findById(carId);
    //Checking if the car is owned by the user
    if (car.owner.toString() !== _id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this car" });
    }

    car.owner = null;
    car.isAvailable = false;
    await car.save();
    res
      .status(200)
      .json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to get DashboardData
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;
    if (role !== "owner") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const totalCars = cars.length;
    const totalBookings = bookings.length;

    // FIXED: Include both confirmed and completed statuses
    const completedBookings = bookings.filter(
      (booking) =>
        booking.status === "confirmed" || booking.status === "completed"
    );
    const pendingBookings = bookings.filter(
      (booking) => booking.status === "pending"
    );

    // FIXED: Add null checks for price
    const monthlyRevenue = completedBookings.reduce(
      (acc, booking) => acc + (booking.price || 0),
      0
    );

    // FIXED: Ensure proper data structure for recent bookings
    const recentBookings = bookings.slice(0, 5).map((booking) => ({
      _id: booking._id,
      car: booking.car || {},
      price: booking.price || 0,
      status: booking.status || "pending",
      createdAt: booking.createdAt,
      pickupDate: booking.pickupDate,
      returnDate: booking.returnDate,
    }));

    const dashBoardData = {
      totalCars,
      totalBookings,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      monthlyRevenue,
      recentBookings,
    };

    res.status(200).json({
      success: true,
      data: dashBoardData,
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//ApI to update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });
    var optmizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, //Resize to 1280px
        { quality: "auto" }, //Auto Compression
        { format: "webp" }, //Convert to webp format
      ],
    });
    const image = optmizedImageUrl;
    const user = await User.findByIdAndUpdate(_id, { image });
    res.status(200).json({
      success: true,
      message: "User image updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
