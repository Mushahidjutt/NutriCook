import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomButton from "../Components/Common/Button/CustomButton";
import { userNameUpdateApi } from "../app/feautures/Profile/userNameUpdateApi";
import { userNameMeApi } from "../app/feautures/Profile/userNameApi";
import { userEmailUpdateApi } from "../app/feautures/Profile/userEmailUpdate";
import { updatePasswordApi } from "../app/feautures/Authentication/authApi";

function Profile() {
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateUserEmail, setUpdateUserEmail] = useState("");
  const [updateUserPassword, setUpdateUserPassword] = useState({
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
  });

  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    handleGetMeAPi();
  }, []);

  const handleGetMeAPi = async () => {
    try {
      const response = await userNameMeApi();
      setUserDetail(response);
    } catch (error) {
      console.error("Error fetching GetUserDetail:", error);
    }
  };

  const handleUpdateUserName = async () => {
    try {
      const response = await userNameUpdateApi({ name: updateUsername });
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating Username:", error);
    }
  };

  const handleUpdateUserEmail = async () => {
    try {
      const response = await userEmailUpdateApi({ email: updateUserEmail });
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating UserEmail:", error);
    }
  };

  const handleUpdateUserPassword = async () => {
    try {
      const response = await updatePasswordApi(updateUserPassword);
      localStorage.setItem("token", response.token);

      console.log("This is REsponse ", response);
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating UsesPassword:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserPassword((prev) => ({ ...prev, [name]: value }));
  };
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
            <h1>{userDetail?.user?.name}</h1>
            <p>{userDetail?.user?.email}</p>

            <form>
              <label className="ml-2">Current Username</label>
              <input
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2
              focus:ring-amber-300 focus:outline-none transition duration-200 
              cursor-not-allowed"
                type="text"
                value={userDetail?.user?.name}
                disabled
              />
              <label className="ml-2 mt-6">New Username</label>
              <input
                className="my-2 mb-6  w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="text"
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
              />
              <div className="text-center font-semibold mb-8">
                <CustomButton
                  value="Update Username"
                  onClick={() => handleUpdateUserName(updateUsername)}
                ></CustomButton>
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
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 
              focus:ring-amber-300 focus:outline-none transition duration-200 cursor-not-allowed"
                type="email"
                disabled
                value={userDetail?.user?.email}
              />
              <label className="ml-2 mt-6">New Email</label>
              <input
                className="my-2  w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="email"
                value={updateUserEmail}
                onChange={(e) => setUpdateUserEmail(e.target.value)}
              />

              <div className="text-center font-semibold mb-8 mt-8">
                <CustomButton
                  value="Update Email"
                  onClick={() => handleUpdateUserEmail(updateUserEmail)}
                ></CustomButton>
              </div>
            </form>

            <h1 className="text-xl font-semibold text-center my-6 ">
              {" "}
              <span className="text-green-500 ">🔐🔄</span>Update Password
            </h1>

            <form>
              <label className="ml-2">Current Password</label>
              <input
                onChange={handleChange}
                name="passwordCurrent"
                value={updateUserPassword.passwordCurrent}
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="password"
              />

              <label className="ml-2">New Password</label>
              <input
                onChange={handleChange}
                name="password"
                value={updateUserPassword.password}
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="password"
                // value={userDetail?.user?.email}
              />

              <label className="ml-2 mt-6">Confirm Password</label>
              <input
                onChange={handleChange}
                name="passwordConfirm"
                value={updateUserPassword.passwordConfirm}
                className="my-2  w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
                type="password"
                // value={updateUserEmail}
                // onChange={(e) => setUpdateUserEmail(e.target.value)}
              />

              <div className="text-center font-semibold mb-8 mt-8">
                <CustomButton
                  value="Update Password"
                  onClick={() => handleUpdateUserPassword(updateUserPassword)}
                ></CustomButton>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
