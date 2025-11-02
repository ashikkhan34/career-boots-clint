"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        contactNo: data.contactNo,
        role: "user",
        isDeleted: false,
        isPasswordChange: false,
      };

      const res = await axios.post(
        "http://localhost:4000/api/users/create-user",
        userInfo
      );

      if (res.data?.success) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Created Successfully 🎉",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Toaster />
      <div className=" shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 20, message: "Maximum 20 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{6,}$/,
                  message:
                    "Must contain uppercase, lowercase, number & special character",
                },
              })}
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="e.g. 017XXXXXXXX"
              {...register("contactNo", {
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message: "Invalid Bangladeshi phone number",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.contactNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNo.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
