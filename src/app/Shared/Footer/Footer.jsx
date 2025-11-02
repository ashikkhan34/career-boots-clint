"use client";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaWhatsappSquare,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="dark:bg-gray-800 bg-gray-500 py-10 px-5 md:px-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold  mb-4">CareerBoost</h2>
          <p className="text-sm leading-6">
            Empowering learners and job seekers to reach their career goals with
            mentorship, skill-building, and practical experience.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="/mentors" className="hover:text-white">
                Mentors
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:text-white">
                Courses
              </a>
            </li>
            <li>
              <a href="/internships" className="hover:text-white">
                Internships
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/ak.ashik.khan.12376/"
              target="_blank"
              className="hover:text-blue"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/dev-ashikkhan/"
              target="_blank"
              className="hover:text-blue-800"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/ashikkhan34/"
              target="_blank"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              className="hover:text-white"
            >
              <FaWhatsappSquare />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">
        <p>© {new Date().getFullYear()} CareerBoost. All rights reserved.</p>
      </div>
    </footer>
  );
}
