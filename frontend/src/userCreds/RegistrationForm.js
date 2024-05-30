import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        data
      );
      toast.success("User registered successfully", { autoClose: 2000 });
      const { email } = data;
      reset();
      navigate(`/verifyOTP?email=${email}`);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 409:
            toast.error("User already exists", { autoClose: 2000 });
            break;
          case 400:
            toast.error("Invalid password", { autoClose: 2000 });
            break;
          default:
            toast.error("Registration error", { autoClose: 2000 });
            break;
        }
      } else {
        toast.error("Network error", { autoClose: 2000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value) => {
    return (
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(value) ||
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    );
  };

  const validateConfirmPassword = (value) => {
    return value === watch("password") || "Passwords do not match";
  };

  const Spinner = () => (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-gray-200 bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <div>
      {loading && <Spinner />}
      <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${loading ? 'hidden' : ''}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.fullName && (
                  <span className="text-red-600">{errors.fullName.message}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    validate: validatePassword,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-600">{errors.password.message}</span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: validateConfirmPassword,
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <span className="text-red-600">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
        <div className="mt-4 text-center">
          Already a member? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
