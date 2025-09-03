import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import CustomInput from "../Common/CustomInput";

const validationSchema = Yup.object({
  fullname: Yup.string()
    .required(" Full Name is required")
    .min(3, " Full Name must be at least 3 characters"),
  email: Yup.string().required("Address is required"),
  password: Yup.string().required("password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});

function Signup() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit:async (values) => {},
  });
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold text-center my-6">Sign Up</h1>
        <div className="flex justify-center">
          <div className='" w-full max-w-3xl  p-8 rounded-3xl shadow-2xl mb-8   bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200'>
            <h1 className="font-semibold text-center">
              Please Sign up for an account
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.fullname && formik.touched.fullname ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.fullname}
                  </div>
                ) : null}
              </div>

              <div className="mb-5 flex flex-col gap-3">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
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
                {formik.errors.password && formik.touched.password ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className="text-center">
                <CustomButton type="submit" value="Submit"></CustomButton>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
