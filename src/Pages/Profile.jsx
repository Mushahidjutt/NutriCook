import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomButton from "../Components/Common/Button/CustomButton";
import { userNameUpdateApi } from "../app/feautures/Profile/userNameUpdateApi";
import { userNameMeApi } from "../app/feautures/Profile/userNameApi";
import { userEmailUpdateApi } from "../app/feautures/Profile/userEmailUpdate";
import { updatePasswordApi } from "../app/feautures/Authentication/authApi";
import Loader from "../Components/Common/Loader";

function Profile() {
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateUserEmail, setUpdateUserEmail] = useState("");
  const [updateUserPassword, setUpdateUserPassword] = useState({
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
  });

  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await userNameUpdateApi({ name: updateUsername });
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating Username:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserEmail = async () => {
    try {
      setLoading(true);

      const response = await userEmailUpdateApi({ email: updateUserEmail });
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating UserEmail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserPassword = async () => {
    try {
      setLoading(true);

      const response = await updatePasswordApi(updateUserPassword);
      localStorage.setItem("token", response.token);
      console.log("This is REsponse ", response);
      handleGetMeAPi();
    } catch (error) {
      console.error("Error in Updating UsesPassword:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserPassword((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center my-10 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
        ⚡ Profile Settings
      </h1>
      <main>
        <div className="flex justify-center items-center mt-10 mb-8">
          <div className="w-full max-w-4xl p-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-gray-200 space-y-12">
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
              👤 Update Username
            </h2>

            <div className="flex flex-col items-center justify-center p-6 mb-8 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-cyan-50 shadow-md border border-gray-200">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4">
                {userDetail?.user?.name?.charAt(0)}
              </div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {userDetail?.user?.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {userDetail?.user?.email}
              </p>
            </div>

            <form>
              <label className="ml-2">Current Username</label>
              <input
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 
             text-gray-500 placeholder-gray-400 shadow-sm cursor-not-allowed"
                type="text"
                value={userDetail?.user?.name}
                disabled
              />
              <label className="ml-2 mt-6">New Username</label>
              <input
                className="my-2 mb-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition duration-200"
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

            <h2 className="text-2xl font-semibold text-center text-emerald-600 mb-6">
              📧 Update Email
            </h2>

            <form>
              <label className="ml-2">Current Email</label>
              <input
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 
             text-gray-500 placeholder-gray-400 shadow-sm cursor-not-allowed"
                type="email"
                disabled
                value={userDetail?.user?.email}
              />
              <label className="ml-2 mt-6">New Email</label>
              <input
                className="my-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 focus:outline-none transition duration-200"
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

            <h2 className="text-2xl font-semibold text-center text-violet-600 mb-6">
              🔐 Update Password
            </h2>

            <form>
              

              <label className="ml-2">New Password</label>
              <input
                onChange={handleChange}
                name="password"
                value={updateUserPassword.password}
                className="my-2 mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-300 focus:outline-none transition duration-200"
                type="password"
              />

              <label className="ml-2 mt-6">Confirm Password</label>
              <input
                onChange={handleChange}
                name="passwordConfirm"
                value={updateUserPassword.passwordConfirm}
                className="my-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
             text-gray-700 placeholder-gray-400 shadow-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-300 focus:outline-none transition duration-200"
                type="password"
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
