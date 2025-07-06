import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        // Clear invalid token silently
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common["Authorization"] = "";
      }
    } catch (error) {
      // Clear invalid token on any error
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setIsOwner(false);
      axios.defaults.headers.common["Authorization"] = "";

      // Only show toast for actual errors, not for expected 401 responses
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const fetchCars = async () => {
    try {
      setCarsLoading(true);
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
        // Remove success toast to avoid spam
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Only show error if it's not a 401 (unauthorized)
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Failed to fetch cars");
      }
    } finally {
      setCarsLoading(false);
    }
  };

  // UseEffect to retrieve token from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    // Fetch cars regardless of authentication status
    fetchCars();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  //Function Logout the user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    navigate("/");
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("Logged out successfully");
  };

  return (
    <AppContext.Provider
      value={{
        navigate,
        currency,
        token,
        setToken,
        user,
        setUser,
        isOwner,
        setIsOwner,
        showLogin,
        setShowLogin,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        cars,
        setCars,
        carsLoading,
        fetchCars,
        fetchUser,
        logout,
        axios,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
