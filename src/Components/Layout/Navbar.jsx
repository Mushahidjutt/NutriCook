import React from "react";
import { IconChefHat } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="flex justify-between px-6 py-3 ">
        <div>
          <h1 className="flex ">
            <IconChefHat size={60} stroke={2} color="blue" />
            <span className="ml-3 mt-4 text-3xl font-bold">
              Nutr<span className="text-yellow-500">i</span>
              <span className="text-blue-600">Cook</span>
            </span>
          </h1>
        </div>

        <div className="text-2xl  flex items-center justify-center gap-3">
          <Link to="/home" className="hover:text-indigo-600 transition">
            Home
          </Link>

          <Link to="/recipe" className="hover:text-indigo-600 transition">
            Recipe
          </Link>

          <Link to="/recipes" className="hover:text-indigo-600 transition">
            Recipes
          </Link>

          <Link to="/nutrients" className="hover:text-indigo-600 transition">
            Nutrients
          </Link>

          <Link to="/liked" className="hover:text-indigo-600 transition">
            Liked
          </Link>

          <Link to="/profile" className="hover:text-indigo-600 transition">
            Profile
          </Link>

          <Link to="/logout" className="hover:text-indigo-600 transition">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
