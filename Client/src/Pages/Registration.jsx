import React, { useState } from "react";
import BASE_CONN from "../config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.email ||
      !input.password ||
      !input.confirmPassword
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (input.password !== input.confirmPassword) {
      toast.error("The passwords do not match.");
      return;
    }

    if (!isChecked) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    setIsLoading(true);

    const api = `${BASE_CONN}/banking/insert`;
    try {
      const response = await axios.post(api, input);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);

      setInput({ name: "", email: "", password: "", confirmPassword: "" });
      setIsChecked(false);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email already exists. Please use another email.");
      } else {
        toast.error(
          error.response?.data?.message || "An unexpected error occurred."
        );
      }
      console.error("Error:", error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-grey-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl w-full space-y-8 flex items-center">
        <div className="w-1/2 p-4">
          <img
            src="2378426.jpg"
            alt="Cover"
            onError={(e) => {
              e.target.src = "default-image.jpg";
            }}
            className="w-full h-full object-cover rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Join Our Community
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create an account to enjoy all the benefits we offer.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 block text-sm text-gray-900">
                I agree to the Terms and Conditions
              </span>
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
