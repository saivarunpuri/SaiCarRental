import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log("Navbar user:", user);
  return (
    <nav
      className="
      max-w-5xl mx-auto
      mt-6
      flex items-center justify-between
      px-8 py-3
      rounded-full
      bg-[color:var(--color-surface)]/90
      border border-[color:var(--color-border-color)]
      shadow-md
      backdrop-blur
      text-[color:var(--color-text)]
      text-sm
      relative
      z-20
    "
    >
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          className="h-8"
          alt="logo"
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 ml-7">
        {menuLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {link.name}
            </span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {link.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden ml-14 md:flex items-center gap-4">
        <button
          className="border border-[color:var(--color-border-color)] hover:bg-[color:var(--color-light)] px-4 py-2 rounded-full text-sm font-medium transition"
          onClick={() => (isOwner ? navigate("/owner") : changeRole())}
        >
          {isOwner ? "Dashboard" : "List Your Car"}
        </button>
        <button
          className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[color:var(--color-light)] transition duration-300"
          onClick={() => (user ? logout() : setShowLogin(true))}
        >
          {user ? "Logout" : "Get Started"}
        </button>
        {user && (
          <span className="text-primary font-semibold flex items-center gap-1">
            Hi, {user.name}{" "}
            <span role="img" aria-label="smile">
              🙂
            </span>
          </span>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-600"
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute ${
          isOpen ? "flex" : "hidden"
        } top-16 left-0 bg-[color:var(--color-background)] w-full flex-col items-center gap-4 z-50 border-t border-[color:var(--color-border-color)]`}
      >
        {menuLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <button
          className="border border-[color:var(--color-border-color)] hover:bg-[color:var(--color-light)] px-4 py-2 rounded-full text-sm font-medium transition"
          onClick={() => {
            setIsOpen(false);
            isOwner ? navigate("/owner") : changeRole();
          }}
        >
          {isOwner ? "Dashboard" : "Contact"}
        </button>
        <button
          className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[color:var(--color-light)] transition duration-300"
          onClick={() => {
            setIsOpen(false);
            user ? logout() : setShowLogin(true);
          }}
        >
          {user ? "Logout" : "Get Started"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
