import React from "react";
import Navbar from "./components/Navbar";
import { Routes, useLocation, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import Cars from "./pages/Cars";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dasboard from "./pages/owner/Dasboard";
import ManageCar from "./pages/owner/ManageCar";
import ManageBookings from "./pages/owner/ManageBookings";
import AddCar from "./pages/owner/AddCar";
import Login from "./components/Login";
import MouseTrail from "./components/MouseTrail";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const isCarsPath = location.pathname === "/cars";

  return (
    <>
      <MouseTrail />
      <Toaster />
      {showLogin && <Login />}
      {isOwnerPath ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/cars-details/:id" element={<CarDetails />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dasboard />} />
          <Route path="/owner/manage-cars" element={<ManageCar />} />
          <Route path="/owner/manage-bookings" element={<ManageBookings />} />
          <Route path="/owner/add-car" element={<AddCar />} />
        </Route>
      </Routes>
      {!isOwnerPath && !isCarsPath && <Footer />}
    </>
  );
};

export default App;
