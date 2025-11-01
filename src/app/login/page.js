"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
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
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );

      if (res.data?.success) {
        // ✅ Save token + user info
        localStorage.setItem("career-boots-token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));

        // ✅ Success Alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful 🎉",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
        router.push("/");
      } else {
        toast.error(res.data.message || "Invalid credentials!");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again!";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white py-10 px-4">
      <Toaster />
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              {...register("password", { required: "Password is required" })}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
