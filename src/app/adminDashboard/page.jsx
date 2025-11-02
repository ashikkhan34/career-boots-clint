"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  BookOpen,
  MessageSquare,
  FileQuestion,
  ClipboardList,
  Calendar,
  UserCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    mentors: [],
    courses: [],
    users: [],
    feedbacks: [],
    questions: [],
    interviews: [],
    exams: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all data once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          mentorRes,
          courseRes,
          userRes,
          feedbackRes,
          questionRes,
          interviewRes,
          examRes,
        ] = await Promise.all([
          axios.get("http://localhost:4000/api/mentor/"),
          axios.get("http://localhost:4000/api/course/"),
          axios.get("http://localhost:4000/api/users/"),
          axios.get("http://localhost:4000/api/feedback/"),
          axios.get("http://localhost:4000/api/question/"),
          axios.get("http://localhost:4000/api/interviewSession/"),
          axios.get("http://localhost:4000/api/exam/"),
        ]);

        setData({
          mentors: mentorRes.data?.mentor || mentorRes.data.data || [],
          courses: courseRes.data?.data || courseRes.data || [],
          users: userRes.data?.data || userRes.data || [],
          feedbacks: feedbackRes.data?.data || feedbackRes.data || [],
          questions: questionRes.data?.data || questionRes.data || [],
          interviews: interviewRes.data?.data || interviewRes.data || [],
          exams: examRes.data?.data || examRes.data || [],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data from server");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Users",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      count: data.users.length,
    },
    {
      title: "Mentors",
      icon: <UserCheck className="w-6 h-6 text-green-500" />,
      count: data.mentors.length,
    },
    {
      title: "Courses",
      icon: <BookOpen className="w-6 h-6 text-yellow-500" />,
      count: data.courses.length,
    },
    {
      title: "Feedbacks",
      icon: <MessageSquare className="w-6 h-6 text-indigo-500" />,
      count: data.feedbacks.length,
    },
    {
      title: "Questions",
      icon: <FileQuestion className="w-6 h-6 text-orange-500" />,
      count: data.questions.length,
    },
    {
      title: "Interviews",
      icon: <Calendar className="w-6 h-6 text-teal-500" />,
      count: data.interviews.length,
    },
    {
      title: "Exams",
      icon: <ClipboardList className="w-6 h-6 text-pink-500" />,
      count: data.exams.length,
    },
  ];

  // 📊 Chart Data
  const chartData = stats.map((item) => ({
    name: item.title,
    count: item.count,
  }));

  const pieColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#6366F1",
    "#F97316",
    "#14B8A6",
    "#EC4899",
  ];

  return (
    <div className="min-h-screen  p-6 md:p-10">
      <div className="max-w-7xl mx-auto mt-12">
        <h1 className="text-3xl font-bold  mb-2">
         Welcome <span className="text-blue-600">{user.name}</span> to Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-10">
          Manage and monitor all platform activities at a glance.
        </p>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-20 text-lg">
            Loading dashboard...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 bg-red-50 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="dark:bg-gray-800 hover:shadow-blue-700 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all flex justify-between items-center"
                >
                  <div>
                    <h3 className=" text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold mt-1">{item.count}</p>
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Bar Chart */}
              <div className=" p-6 rounded-2xl shadow-sm dark:shadow-blue-600">
                <h2 className="text-lg font-semibold mb-4 ">
                  Platform Overview
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className=" p-6 rounded-2xl shadow-sm dark:shadow-blue-600">
                <h2 className="text-lg font-semibold mb-4 ">
                  Data Distribution
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Users */}
            <div className="shadow-sm rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Recent Users
              </h2>
              {data.users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-t">
                    <thead className="text-gray-500 text-left border-b">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users.slice(0, 6).map((user, i) => (
                        <tr
                          key={user._id || i}
                          className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="p-2">{i + 1}</td>
                          <td className="p-2 font-medium ">
                            {user.name || "N/A"}
                          </td>
                          <td className="p-2">{user.email || "N/A"}</td>
                          <td className="p-2 capitalize">
                            {user.role || "User"}
                          </td>
                          <td className="p-2">
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent users found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
