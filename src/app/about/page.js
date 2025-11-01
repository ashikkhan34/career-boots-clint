"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Target, Rocket } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-6 md:px-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          About <span className="text-indigo-600">Career Boots</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Empowering students and professionals to kickstart their dream careers 
          with modern learning, mentorship, and opportunities.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Image
            src="/feature.png"
            alt="Career Boots Team"
            width={500}
            height={400}
            className="rounded-2xl shadow-md"
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Who We Are
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Career Boots is a passionate community of mentors, developers, and learners
            focused on helping individuals upskill, grow, and succeed in their career journey.
            We provide curated learning resources, virtual mentorship, and project-based learning experiences.
          </p>

          <div className="space-y-4">
            <Feature icon={Users} title="Community" text="A supportive group of learners and mentors from across the globe." />
            <Feature icon={Target} title="Goal Oriented" text="We focus on real-world outcomes, not just theory." />
            <Feature icon={Rocket} title="Fast Growth" text="Accelerate your learning journey with modern tech and mentorship." />
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
          Ready to boost your career?
        </h3>
        <a
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition"
        >
          Contact Us
        </a>
      </motion.div>
    </div>
  );
}

// Reusable Feature Component
function Feature({ icon: Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="p-3 bg-indigo-100 rounded-lg">
        <Icon className="text-indigo-600 w-6 h-6" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-slate-600 text-sm">{text}</p>
      </div>
    </motion.div>
  );
}
