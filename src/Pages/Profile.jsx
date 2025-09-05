import React from "react";
import Navbar from "../Components/Layout/Navbar";
import { IconUser } from "@tabler/icons-react";
import CustomButton from "../Components/Common/Button/CustomButton";

function Profile() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <main>
        <div className="flex justify-center items-center mt-10 mb-8">
          <div className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl mb-8 bg-[#BAE6FD]">
            <h1 className="text-xl font-semibold text-center my-2">
              {" "}
              <span>👤 </span>Update Username
            </h1>

            <form>
              <label className="ml-2">Current Username</label>
              <input
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="text"
              />
              <label className="ml-2 mt-6">New Username</label>
              <input
                className="my-2 mb-6  w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="text"
              />
              <div className="text-center font-semibold mb-8">
                <CustomButton value="Update Username"></CustomButton>
              </div>
            </form>

            <h1 className="text-xl font-semibold text-center my-6 ">
              {" "}
              <span className="text-green-500 ">📧</span>Update Email
            </h1>

            <form>
              <label className="ml-2">Current Email</label>
              <input
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="email"
              />
              <label className="ml-2 mt-6">New Email</label>
              <input
                className="my-2  w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="email"
              />

              <div className="text-center font-semibold mb-8 mt-8">
                <CustomButton value="Update Email"></CustomButton>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
