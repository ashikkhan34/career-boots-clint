"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="dark:bg-gray-900 relative bg-gradient-to-r from-blue-600 to-indigo-900 text-white overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-0 w-56 h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center md:justify-between">
        {/* Text */}
        <div className="md:w-1/2 space-y-6">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Boost Your Career with{" "}
            <span className="text-yellow-300">Mentorship</span> & Learning
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-100"
          >
            Join CareerBoots to learn from industry experts, sharpen your
            skills, and land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-4 flex-wrap"
          >
            <Link
              href="/register"
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow-lg transition"
            >
              Get Started
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 border border-white hover:bg-white hover:text-gray-900 transition rounded-lg font-semibold"
            >
              Explore Courses
            </Link>
          </motion.div>
        </div>

        {/* Image / Illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className=" mt-12 md:mt-0 flex justify-center"
        >
          <Image
          width={400}
          height={40}
            src="/career.jpg"
            alt="Career Boost Illustration"
            className="w-full rounded-t-full max-w-md animate-float"
          />
        </motion.div>
      </div>
    </section>
  );
}
