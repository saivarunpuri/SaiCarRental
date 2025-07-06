import express from "express";
import {
  changeRoleToOwner,
  addCars,
  getOwnerCars,
  toggleCarAvailability,
  deleteCar,
  getDashboardData,
  updateUserImage,
} from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, upload.single("image"), addCars);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car/:carId", protect, toggleCarAvailability);
ownerRouter.post("/delete-car/:carId", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-image", protect, upload.single("image"), updateUserImage);  
export default ownerRouter;
