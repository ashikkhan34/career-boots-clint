"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MentorDetailsPage({ params }) {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await fetch(`http://localhost:4000/api/mentor/${id}`);
      const data = await res.json();
      console.log(data.data.name);
      setMentor(data.data);
    };
    fetchMentor();
  }, [id]);

  if (!mentor) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading mentor details...
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 max-w-4xl mx-auto px-6 py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className=" absolute inset-0 -z-10 to-transparent blur-3xl"></div>

      {/* Header */}
      <div className="md:flex items-center justify-center gap-4 mt-5">
        <div>
          <Image
            src={mentor.image}
            width={400}
            height={300}
            className="w-40 h-40 rounded-t-xl mb-3 mx-auto"
          ></Image>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold ">
            {mentor?.name}
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
            Email: {mentor?.email}
          </p>
        </motion.div>
      </div>

      {/* Mentor Details Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className=" backdrop-blur-xl rounded-3xl shadow-sm p-8 hover:shadow-pink-600"
      >
        <div className="grid sm:grid-cols-2 gap-6  ">
          {mentor.bio && (
            <p>
              <strong>Bio:</strong> {mentor.bio}
            </p>
          )}
          {mentor.skills && mentor.skills.length > 0 && (
            <p>
              <strong>Skills:</strong> {mentor.skills.join(", ")}
            </p>
          )}
          <p>
            <strong>Experience:</strong> {mentor.experience} years
          </p>
          <p>
            <strong>Verified:</strong> {mentor.isVerified ? "✅ Yes" : "❌ No"}
          </p>
          {mentor.expertise && mentor.expertise.length > 0 && (
            <p>
              <strong>Expertise:</strong> {mentor.expertise.join(", ")}
            </p>
          )}
        </div>

        {/* Availability */}
        {mentor.availability && mentor.availability.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">
              Availability
            </h3>
            <ul className="list-disc list-inside  space-y-1">
              {mentor.availability.map((slot, idx) => (
                <li key={idx}>
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Session History */}
        {mentor.sessionHistory && mentor.sessionHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">
              Session History
            </h3>
            <p className="text-gray-700">
              {mentor.sessionHistory.length} sessions conducted
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
