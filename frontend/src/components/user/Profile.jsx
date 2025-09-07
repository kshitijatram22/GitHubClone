import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import pfp from "./user.png";
import { BookOpen, Star, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "Username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Error while fetching user details", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Sub Navigation */}
      <div className="flex justify-center bg-[#1c1f24] text-gray-200 py-3 shadow-md space-x-10">
        <p className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition">
          <BookOpen size={18} /> Overview
        </p>
        <p className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition">
          <Star size={18} /> Starred Repositories
        </p>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center text-center bg-[#1e2329] rounded-2xl shadow-lg mt-6">
        {/* Profile Picture */}
        <img
          src={pfp}
          alt="User Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-600 shadow-md"
        />

        {/* Username */}
        <h2 className="mt-4 text-2xl font-bold text-gray-100">
          {userDetails.username}
        </h2>

        {/* Follow Button */}
        <button className="mt-3 flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow-md transition">
          <UserPlus size={18} /> Follow
        </button>

        {/* Followers / Following */}
        <div className="mt-4 flex space-x-6 text-gray-300">
          <span className="font-semibold">10 Followers</span>
          <span className="font-semibold">10 Following</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-md shadow-md transition"
        >
          <LogOut size={18} /> Logout
        </button>

        {/* Heatmap */}
        <div className="w-full mt-8">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
}
