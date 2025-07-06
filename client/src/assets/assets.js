import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg";
import close_icon from "./close_icon.svg";
import users_icon from "./users_icon.svg";
import car_icon from "./car_icon.svg";
import location_icon from "./location_icon.svg";
import fuel_icon from "./fuel_icon.svg";
import addIcon from "./addIcon.svg";
import carIcon from "./carIcon.svg";
import carIconColored from "./carIconColored.svg";
import dashboardIcon from "./dashboardIcon.svg";
import dashboardIconColored from "./dashboardIconColored.svg";
import addIconColored from "./addIconColored.svg";
import listIcon from "./listIcon.svg";
import listIconColored from "./listIconColored.svg";
import cautionIconColored from "./cautionIconColored.svg";
import arrow_icon from "./arrow_icon.svg";
import star_icon from "./star_icon.svg";
import check_icon from "./check_icon.svg";
import tick_icon from "./tick_icon.svg";
import delete_icon from "./delete_icon.svg";
import eye_icon from "./eye_icon.svg";
import eye_close_icon from "./eye_close_icon.svg";
import filter_icon from "./filter_icon.svg";
import edit_icon from "./edit_icon.svg";
import calendar_icon_colored from "./calendar_icon_colored.svg";
import location_icon_colored from "./location_icon_colored.svg";
import testimonial_image_1 from "./testimonial_image_1.png";
import testimonial_image_2 from "./testimonial_image_2.png";
import main_car from "./main_car.png";
import banner_car_image from "./banner_car_image.png";
import user_profile from "./user_profile.png";
import upload_icon from "./upload_icon.svg";
import car_image1 from "./car_image1.png";
import car_image2 from "./car_image2.png";
import car_image3 from "./car_image3.png";
import car_image4 from "./car_image4.png";
import car_image5 from "./HDCAR1.jpg";
import car_image6 from "./HDCAR2.jpeg";
import car_image7 from "./HSCAR3.jpg";
import car_image8 from "./HDCAR4.jpg";
import car_image9 from "./HDCAR5.jpg";
import car_image10 from "./SZCAR1.jpg";
import car_image11 from "./SZCAR2.jpg";
import car_image12 from "./SZCAR3.jpg";
import car_image13 from "./SZCAR4.jpg";
import car_image14 from "./SZCAR5.jpeg";

export const cityList = ["New York", "Los Angeles", "Houston", "Chicago"];

export const assets = {
  logo,
  gmail_logo,
  facebook_logo,
  instagram_logo,
  twitter_logo,
  menu_icon,
  search_icon,
  close_icon,
  users_icon,
  edit_icon,
  car_icon,
  location_icon,
  fuel_icon,
  addIcon,
  carIcon,
  carIconColored,
  dashboardIcon,
  dashboardIconColored,
  addIconColored,
  listIcon,
  listIconColored,
  cautionIconColored,
  calendar_icon_colored,
  location_icon_colored,
  arrow_icon,
  star_icon,
  check_icon,
  tick_icon,
  delete_icon,
  eye_icon,
  eye_close_icon,
  filter_icon,
  testimonial_image_1,
  testimonial_image_2,
  main_car,
  banner_car_image,
  car_image1,
  upload_icon,
  user_profile,
  car_image2,
  car_image3,
  car_image4,
  car_image5,
  car_image6,
  car_image7,
  car_image8,
  car_image9,
  car_image10,
  car_image11,
  car_image12,
  car_image13,
  car_image14,
};

export const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Cars", path: "/cars" },
  { name: "My Bookings", path: "/my-bookings" },
];

export const ownerMenuLinks = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: dashboardIcon,
    coloredIcon: dashboardIconColored,
  },
  {
    name: "Add car",
    path: "/owner/add-car",
    icon: addIcon,
    coloredIcon: addIconColored,
  },
  {
    name: "Manage Cars",
    path: "/owner/manage-cars",
    icon: carIcon,
    coloredIcon: carIconColored,
  },
  {
    name: "Manage Bookings",
    path: "/owner/manage-bookings",
    icon: listIcon,
    coloredIcon: listIconColored,
  },
];

export const dummyUserData = {
  _id: "6847f7cab3d8daecdb517095",
  name: "GreatStack",
  email: "admin@example.com",
  role: "owner",
  image: user_profile,
};

// Car Data
export const dummyCarData = [
  {
    _id: "67ff5bc069c03d4e45f30b77",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "BMW",
    model: "X5",
    image: car_image1,
    year: 2006,
    category: "SUV",
    seating_capacity: 4,
    fuel_type: "Hybrid",
    transmission: "Semi-Automatic",
    pricePerDay: 300,
    location: "New York",
    description:
      "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.",
    isAvaliable: true,
    createdAt: "2025-04-16T07:26:56.215Z",
  },
  {
    _id: "67ff6b758f1b3684286a2a65",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Toyota",
    model: "Corolla",
    image: car_image2,
    year: 2021,
    category: "Sedan",
    seating_capacity: 4,
    fuel_type: "Diesel",
    transmission: "Manual",
    pricePerDay: 130,
    location: "Chicago",
    description:
      "The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:33:57.993Z",
  },
  {
    _id: "67ff6b9f8f1b3684286a2a68",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Jeep ",
    model: "Wrangler",
    image: car_image3,
    year: 2023,
    category: "SUV",
    seating_capacity: 4,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    pricePerDay: 200,
    location: "Los Angeles",
    description:
      "The Jeep Wrangler is a mid-size luxury SUV produced by Jeep. The Wrangler made its debut in 2003 as the first SUV ever produced by Jeep.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:34:39.592Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ford",
    model: "Neo 6",
    image: car_image4,
    year: 2022,
    category: "Sedan",
    seating_capacity: 2,
    fuel_type: "Diesel",
    transmission: "Semi-Automatic",
    pricePerDay: 209,
    location: "Houston",
    description:
      "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e35",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "BR-V",
    image: car_image5,
    year: 2023,
    category: "SUV",
    seating_capacity: 7,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 180,
    location: "New York",
    description:
      "The Honda BR-V is a compact SUV with 7-seater capacity, perfect for family trips. Features modern design with excellent fuel efficiency.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:20:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e36",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "City",
    image: car_image6,
    year: 2022,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 120,
    location: "Chicago",
    description:
      "The Honda City is a compact sedan known for its reliability and fuel efficiency. Perfect for daily commuting and city driving.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:25:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e37",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "Civic",
    image: car_image7,
    year: 2023,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 150,
    location: "Los Angeles",
    description:
      "The Honda Civic is a popular compact sedan with sporty design and excellent performance. Features advanced technology and safety features.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:30:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e38",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "CR-V",
    image: car_image8,
    year: 2022,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    pricePerDay: 200,
    location: "Houston",
    description:
      "The Honda CR-V is a compact SUV with excellent fuel efficiency and spacious interior. Perfect for both city and highway driving.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:35:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e39",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Honda",
    model: "Accord",
    image: car_image9,
    year: 2023,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    pricePerDay: 180,
    location: "New York",
    description:
      "The Honda Accord is a midsize sedan with premium features and excellent comfort. Known for its reliability and sophisticated design.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:40:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e40",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Suzuki",
    model: "Swift",
    image: car_image10,
    year: 2022,
    category: "Hatchback",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Manual",
    pricePerDay: 95,
    location: "Chicago",
    description:
      "The Suzuki Swift is a compact hatchback known for its reliability and fuel efficiency. Perfect for city driving and daily commutes.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:45:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e41",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Suzuki",
    model: "Vitara",
    image: car_image11,
    year: 2023,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 140,
    location: "Los Angeles",
    description:
      "The Suzuki Vitara is a compact SUV with modern design and good off-road capabilities. Perfect for adventurous driving.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:50:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e42",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Suzuki",
    model: "Baleno",
    image: car_image12,
    year: 2022,
    category: "Hatchback",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Manual",
    pricePerDay: 85,
    location: "Houston",
    description:
      "The Suzuki Baleno is a premium hatchback with spacious interior and modern features. Great for family use and city driving.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:55:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e43",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Suzuki",
    model: "S-Cross",
    image: car_image13,
    year: 2023,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Diesel",
    transmission: "Automatic",
    pricePerDay: 160,
    location: "New York",
    description:
      "The Suzuki S-Cross is a crossover SUV with elegant design and good fuel efficiency. Perfect for urban and highway driving.",
    isAvaliable: true,
    createdAt: "2025-04-17T07:00:47.318Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e44",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Suzuki",
    model: "Dzire",
    image: car_image14,
    year: 2022,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Manual",
    pricePerDay: 90,
    location: "Chicago",
    description:
      "The Suzuki Dzire is a compact sedan with excellent fuel efficiency and comfortable interior. Ideal for daily commuting.",
    isAvaliable: true,
    createdAt: "2025-04-17T07:05:47.318Z",
  },
];

// Booking Data
export const dummyMyBookingsData = [
  {
    _id: "68482bcc98eb9722b7751f70",
    car: dummyCarData[0],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-13T00:00:00.000Z",
    returnDate: "2025-06-14T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T12:57:48.244Z",
  },
  {
    _id: "68482bb598eb9722b7751f60",
    car: dummyCarData[1],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-12T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 130,
    createdAt: "2025-06-10T12:57:25.613Z",
  },
  {
    _id: "684800fa0fb481c5cfd92e56",
    car: dummyCarData[2],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 600,
    createdAt: "2025-06-10T09:55:06.379Z",
  },
  {
    _id: "6847fe790fb481c5cfd92d94",
    car: dummyCarData[3],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T09:44:25.410Z",
  },
];

// Dashboard Data
export const dummyDashboardData = {
  totalCars: 14,
  totalBookings: 2,
  pendingBookings: 0,
  completedBookings: 2,
  recentBookings: [dummyMyBookingsData[0], dummyMyBookingsData[1]],
  monthlyRevenue: 840,
};
