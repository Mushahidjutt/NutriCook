import React from "react";

import {
  IconChefHat,
  IconHome,
  IconReceipt,
  IconCircleDashedPlus,
  IconApple,
  IconHearts,
  IconUserCircle,
  IconLogout,
} from "@tabler/icons-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Succesful");

    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <div className="flex justify-between px-6 py-2.5 bg-[#E2E8F0]  ">
        <div>
          <h1 className="flex">
            <IconChefHat size={60} stroke={2} color="blue" />
            <Link to="/" className=" mt-3 text-3xl font-bold flex">
              Nutr<span className="text-yellow-500">i</span>
              <span className="text-blue-600">Cook</span>
            </Link>
          </h1>
        </div>

        <div className="text-xl font-semibold   flex items-center justify-center gap-5 ">
          <Link
            to="/"
            className="hover:text-indigo-600 transition flex gap-0.5 "
          >
            <IconHome className="mt-1" size={22} stroke={2} />
            Home
          </Link>

          <Link
            to="/recipe"
            className="hover:text-indigo-600 transition flex gap-0.5 "
          >
            <IconCircleDashedPlus className="mt-1" size={22} stroke={2} />
            Recipe
          </Link>

          <Link
            to="/recipes"
            className="hover:text-indigo-600 transition flex gap-0.5"
          >
            <IconReceipt className="mt-1" size={22} stroke={2} />
            Recipes
          </Link>

          <Link
            to="/nutrients"
            className="hover:text-indigo-600 transition flex gap-0.5"
          >
            <IconApple className="mt-1" size={22} stroke={2} />
            Nutrients
          </Link>

          <Link
            to="/liked"
            className="hover:text-indigo-600 transition flex gap-0.5"
          >
            <IconHearts className="mt-1" size={22} stroke={2} />
            Liked
          </Link>

          <Link
            to="/profile"
            className="hover:text-indigo-600 transition flex gap-0.5"
          >
            <IconUserCircle className="mt-1" size={22} stroke={2} />
            Profile
          </Link>

          <button
            className="hover:text-indigo-600 transition flex gap-0.5 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
            <IconLogout className="mt-1" size={22} stroke={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
