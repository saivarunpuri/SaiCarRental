import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./Routes/userRoutes.js";
import ownerRouter from "./Routes/ownerRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);  
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter); 

const PORT = process.env.PORT || 5000;

  app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});