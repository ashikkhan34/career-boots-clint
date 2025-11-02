"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`https://career-boots-server.vercel.app/api/course/${id}`);
      const data = await res.json();
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading course details...
        </p>
      </div>
    );
  }


  const handleAddToCart = () => {
    Swal.fire({
  title: "Contact Whats'app (01817553134) ",
  icon: "success",
  draggable: true
});
  };


  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-200/40 via-pink-100/40 to-transparent blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900">
            {course?.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl">
            {course.courseOverview}
          </p>
          {course.mentor && (
            <p className="mt-2 text-sm sm:text-base">
              <Link className="text-blue-700 font-bold underline" href={`/MentorDetails/${course.mentor._id}`}>👨‍🏫 Mentor</Link> : {course.mentor.name} ({course.mentor.email})
            </p>
          )}
        </motion.div>

        {/* Course Image + Add to Cart */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={800}
              height={500}
              className="object-cover w-full h-full rounded-3xl"
            />
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1  backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100"
          >
            <div className="grid grid-cols-2 gap-4 ">
              <p><strong>💰 Fee:</strong> {course.fee}</p>
              <p><strong>⭐ Rating:</strong> {course.rating} ({course.totalRating})</p>
              <p><strong>🕓 Duration:</strong> {course.duration} hours</p>
              <p><strong>👥 Enrolled:</strong> {course.totalStudentEnroll}</p>
              <p><strong>🎓 Type:</strong> {course.type}</p>
              <p><strong>🗓️ Starts:</strong> {new Date(course.courseStart).toDateString()}</p>
              <p><strong>🧑‍💻 Lectures:</strong> {course.lectures}</p>
              <p><strong>📝 Exams:</strong> {course.totalExam}</p>
              <p><strong>📂 Projects:</strong> {course.totalProject}</p>
            </div>

            <p className=" leading-relaxed">{course.courseDetails}</p>

            <button
            className="w-full py-3 dark:bg-gray-800 bg-blue-300 hover:bg-blue-500 rounded-xl font-semibold  text-lg transition-all border"
              onClick={handleAddToCart}
             >
                Add to Cart 🛒
            </button>
          </motion.div>
        </div>

        {/* Curriculum & Includes */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 ">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">📚 Curriculum</h2>
            <ul className="list-disc list-inside space-y-2 ">
              {course?.carriculam?.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">🎒 Course Includes</h2>
            <ul className="grid sm:grid-cols-1 gap-3">
              {course.courseIncludes?.map((inc, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2  rounded-lg px-3 py-2"
                >
                  ✅ {inc.text}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Software & Jobs */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">💻 Software Includes</h2>
            <ul className="list-disc list-inside space-y-2 ">
              {course.softwareIncludes?.map((soft, idx) => (
                <li key={idx}>{soft}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">🚀 Job Opportunities</h2>
            <ul className="list-disc list-inside space-y-2 ">
              {course.jobOptions?.map((job, idx) => (
                <li key={idx}>{job}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
