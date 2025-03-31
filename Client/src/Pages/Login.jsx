import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_CONN from "../config";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      return toast.error("Please enter a valid email address.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    let api = `${BASE_CONN}/banking/login`;
    try {
      const res = await axios.post(api, { email, password });
      console.log("Login Response:", res.data);

      toast.success("You are successfully logged in.");
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("userid", res.data._id);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl w-full space-y-8 flex items-center">
        <div className="w-1/2 p-4">
          <img
            src={`${"2378426.jpg"}`}
            alt="Cover"
            className="w-full h-full object-cover rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Turn Your Ideas into Reality
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Start for free and get attractive offers from the community
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Prudentia <span style={{ color: "blue" }}>Login</span>
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-900">
                  Remember me for 30 days
                </span>
              </label>
              <p
                onClick={() => navigate("/sendotp")}
                className="text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
              >
                Forgot Password?
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              <Link to="/registration">
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/registration")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
