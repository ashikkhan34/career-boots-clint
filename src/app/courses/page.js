"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:4000/api/course/");
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  // Filter courses based on search
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="text-center mb-8 p-4 md:flex justify-between mx-9 border border-gray-300 rounded-2xl mt-4 items-center ">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Available Courses: {filteredCourses.length}
        </h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredCourses.map((course) => (
            <Link key={course._id} href={`/courseDetails/${course._id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 rounded-t-xl"></div>
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
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

                <div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500 text-2xl mt-12">No courses found.</p>
      )}
    </div>
  );
}
