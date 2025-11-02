"use client";
import { motion } from "framer-motion";
import { CheckCircle, Rocket, Users, Laptop, Clock, Award } from "lucide-react";

const features = [
  {
    icon: <Rocket className="w-10 h-10 text-blue-500" />,
    title: "Skill-Based Learning",
    description:
      "Access hands-on resources and real-world projects to boost your technical skills and confidence.",
  },
  {
    icon: <Users className="w-10 h-10 text-green-500" />,
    title: "Mentorship & Guidance",
    description:
      "Get career advice, resume feedback, and mentorship from industry professionals.",
  },
  {
    icon: <Laptop className="w-10 h-10 text-purple-500" />,
    title: "Virtual Internships",
    description:
      "Work on real company projects remotely to gain experience before your first job.",
  },
  {
    icon: <Clock className="w-10 h-10 text-orange-500" />,
    title: "Flexible Learning",
    description:
      "Learn at your own pace, anytime, anywhere, with personalized study plans.",
  },
  {
    icon: <Award className="w-10 h-10 text-yellow-500" />,
    title: "Certificates & Badges",
    description:
      "Earn verified certificates and showcase your achievements to employers.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-teal-500" />,
    title: "Career Growth Tools",
    description:
      "Track your goals, build a strong portfolio, and prepare for interviews effectively.",
  },
];

export default function CareerBootsFeaturesPage() {
  return (
    <section className="min-h-screen py-20 px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold  mb-4">
          Discover the Power of <span className="text-blue-600">Career Boots</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Career Boots helps students and professionals enhance their skills, gain experience, and unlock better career opportunities.
        </p>

        <div className="grid md:grid-cols-3  sm:grid-cols-2 gap-8 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shadow-xl hover:shadow-blue-600 rounded-2xl p-6 hover:shadow-sm transition duration-300 dark:bg-gray-800"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 ">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
