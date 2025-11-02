"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AllCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("https://career-boots-server.vercel.app/api/course/");
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="dark:text-gray-100 max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center ">
        All Courses 📖📚
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
    </div>
  );
}
