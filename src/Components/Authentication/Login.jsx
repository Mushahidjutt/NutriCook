import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../app/feautures/Authentication/authApi";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await loginApi(values);

        if (res?.token) {
          localStorage.setItem("token", res.token);
        }
        if (res?.data?.user?.role) {
          localStorage.setItem("role", res.data.user.role);
        }

        navigate("/");
      } catch (error) {
        console.error("Login failed Put Correct email/Password:", error);
      }
    },
  });

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold text-center my-6">Login</h1>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl mb-8 bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200">
            <h1 className="font-semibold text-center mb-6">
              Please Login to your account
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.email && formik.touched.email && (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.password && formik.touched.password && (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="text-center">
                <CustomButton
                  type="button"
                  value="Login"
                  onClick={formik.handleSubmit}
                />
              </div>
            </form>

            <h1 className="font-bold my-4 text-center">
              Don't have an account?
            </h1>

            <div className="text-center">
              <CustomButton value="Signup" onClick={handleNavigateSignup} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
