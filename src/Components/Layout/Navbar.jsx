import React, { useState } from "react";
import {
  IconChefHat,
  IconHome,
  IconReceipt,
  IconCircleDashedPlus,
  IconApple,
  IconHearts,
  IconUserCircle,
  IconLogout,
  IconMenu2,
  IconX,
  IconSearch,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

  const handleLogout = () => {
    toast.success("Logout Succesful");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#E2E8F0] px-6 py-2.5">
      <div className="flex justify-between items-center px-2">
        {/* Logo */}
        <h1 className="flex items-center">
          <IconChefHat size={50} stroke={2} color="blue" />
          <Link to="/" className="ml-2 text-3xl font-bold flex">
            Nutr<span className="text-yellow-500">i</span>
            <span className="text-blue-600">Cook</span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        {localStorage.token ? (
          <ul className="hidden   lg:flex gap-4 lg:text-lg lg:font-semibold sm:px-3">
            <Link to="/" className="hover:text-indigo-600 flex gap-1">
              <IconHome className="mt-0.5" size={22} stroke={2} /> Home
            </Link>
            <Link to="/recipe" className="hover:text-indigo-600 flex gap-1">
              <IconCircleDashedPlus className="mt-0.5" size={22} stroke={2} />{" "}
              Recipe
            </Link>
            <Link to="/recipes" className="hover:text-indigo-600 flex gap-1">
              <IconReceipt className="mt-0.5" size={22} stroke={2} /> Recipes
            </Link>
            <Link to="/nutrients" className="hover:text-indigo-600 flex gap-1">
              <IconApple className="mt-0.5" size={22} stroke={2} /> Nutrients
            </Link>
            <Link to="/liked" className="hover:text-indigo-600 flex gap-1">
              <IconHearts className="mt-0.5" size={22} stroke={2} /> Liked
            </Link>
            <Link to="/profile" className="hover:text-indigo-600 flex gap-1">
              <IconUserCircle className="mt-0.5" size={22} stroke={2} /> Profile
            </Link>
            <button
              className="hover:text-red-600 flex gap-1 cursor-pointer"
              onClick={handleLogout}
            >
              <IconLogout className="mt-0.5" size={22} stroke={2} />
            </button>
          </ul>
        ) : (
          <ul className="hidden md:flex gap-6 text-lg font-semibold">
            <Link to="/" className="hover:text-indigo-600 flex gap-1">
              <IconHome size={22} stroke={2} /> Home
            </Link>
            <Link to="/nutrients" className="hover:text-indigo-600 flex gap-1">
              <IconApple size={22} stroke={2} /> Nutrients
            </Link>
            <Link to="/login" className="hover:text-indigo-600 flex gap-1">
              Login <IconLogout size={22} stroke={2} />
            </Link>
          </ul>
        )}

        {/* Mobile Hamburger Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IconX size={30} stroke={2} />
          ) : (
            <IconMenu2 size={30} stroke={2} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div className="xl:hidden  md: mt-4 flex flex-col gap-4 item-end text-base  p-4 rounded-lg shadow cursor-pointer">
            {localStorage.token ? (
              <>
                <Link
                  to="/"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconHome size={20} /> Home
                </Link>
                <Link
                  to="/recipe"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconCircleDashedPlus size={20} /> Recipe
                </Link>
                <Link
                  to="/recipes"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconReceipt size={20} /> Recipes
                </Link>
                <Link
                  to="/nutrients"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconApple size={20} /> Nutrients
                </Link>
                <Link
                  to="/liked"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconHearts size={20} /> Liked
                </Link>
                <Link
                  to="/profile"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconUserCircle size={20} /> Profile
                </Link>
                <button
                  className="flex gap-1 text-red-600"
                  onClick={handleLogout}
                >
                  Logout <IconLogout size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconHome size={20} /> Home
                </Link>
                <Link
                  to="/nutrients"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <IconApple size={20} /> Nutrients
                </Link>
                <Link
                  to="/login"
                  className="flex gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  Login <IconLogout size={20} />
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
