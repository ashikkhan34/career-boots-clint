"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Dummy logged in user data ( তুমি চাইলে localStorage থেকে নিতে পারো )
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Load all courses
  useEffect(() => {
    fetch("http://localhost:4000/api/course/")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen py-15 px-4">
      <div className="max-w-5xl mx-auto mt-6">
        {/* User Info */}
        {user && (
          <div className="flex items-center gap-4 shadow-blue-700 p-6 rounded-2xl shadow">
            <Image
              src='/pic.jpg'
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        )}

        {/* Enrolled or Available Courses */}
        <div className="mt-8">
          {enrolledCourses.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Your Enrolled Courses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className=" rounded-2xl shadow p-4 hover:shadow-lg transition"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="rounded-lg object-cover w-full h-40"
                    />
                    <h4 className="mt-3 text-lg font-semibold">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
            <h1 className="text-center text-red-600 ">You don't Enroll any Course</h1>
              <h3 className="text-xl font-semibold mb-4">Available Courses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Link key={course._id} href={`/courseDetails/${course._id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Image with gradient overlay */}
                      <div className="relative w-full h-52">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 rounded-t-xl"></div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-2">
                        <h2 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">
                          {course.title}
                        </h2>
                        <div className="flex justify-between items-center text-gray-600">
                          <p className="text-sm">Fee: {course.fee}</p>
                          <p className="text-sm">⭐ {course.rating}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Enrolled: {course.totalStudentEnroll}
                        </p>
                      </div>

                      {/* Animated shadow pulse */}
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
