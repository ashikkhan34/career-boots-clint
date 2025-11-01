"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Valid email required";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message (min 10 chars)";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setStatus("sending");
      // Replace this with your real API endpoint
      await fakeSend(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", phone: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Fake network request to simulate sending
  function fakeSend(data) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        // randomly succeed/fail to demo
        Math.random() > 0.1 ? res({ ok: true }) : rej(new Error("Network"));
      }, 900);
    });
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
      >
        {/* Left - Contact info + animated card */}
        <div className="flex flex-col justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl p-6 border border-gray-100 shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-2">
              Contact Career Boots
            </h2>
            <p className="text-slate-600 mb-4">
              Have questions? Want to collaborate or get mentorship? Send us a
              message — we ll reply within 1-2 business days.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="p-2 bg-slate-100 rounded-lg">
                  <Mail size={18} />
                </span>
                <div>
                  <div className="text-sm text-slate-500">Email</div>
                  <div className="font-medium">ashikkhan314167@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-slate-100 rounded-lg">
                  <Phone size={18} />
                </span>
                <div>
                  <div className="text-sm text-slate-500">Phone</div>
                  <div className="font-medium">+880 01817553134</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="p-2 bg-slate-100 rounded-lg">
                  <MapPin size={18} />
                </span>
                <div>
                  <div className="text-sm text-slate-500">Address</div>
                  <div className="font-medium">Pabna, Bangladesh</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 rounded-xl p-4 border border-dashed border-slate-100"
          >
            <h3 className="text-lg font-medium mb-2">Quick Links</h3>
            <div className="flex flex-col gap-2 text-slate-600">
                <Link className="hover:text-sky-600" href={'/courses'}>Curses</Link>
                <Link className="hover:text-sky-600" href={'/exam'}>Exam</Link>
                <Link className="hover:text-sky-600" href={'/about'}>About</Link>
              
            </div>
          </motion.div>
        </div>

        {/* Right - Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FloatingInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <FloatingInput
              label="Phone (optional)"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <div className="relative">
              <label className="block text-sm text-slate-600 mb-1">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Internship query"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Write your message..."
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-200 border-slate-200 ${
                  errors.message ? "border-rose-400" : ""
                }`}
              />
              {errors.message && (
                <div className="text-rose-500 text-sm mt-1">
                  {errors.message}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-lg shadow-md hover:brightness-105"
              >
                <Send size={16} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </motion.button>

              <div className="text-sm text-slate-500">
                Or reach us on social media
              </div>
            </div>

            {/* status messages */}
            {status === "success" && (
              <div className="text-green-600 font-medium">
                Message sent! We ll reply soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-rose-600 font-medium">
                Something went wrong. Try again.
              </div>
            )}
          </form>

          {/* small animated footer / map placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 rounded-lg overflow-hidden border border-slate-100"
          >
            <div className="p-4 bg-white">
              <div className="text-sm text-slate-500">Our office (map)</div>
              <div className="mt-2 h-36 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.5470440860722!2d90.3945953790138!3d23.779663654366963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77094eace8b%3A0x1cd8c2d9239b6cb7!2sMohakhali%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1761976713152!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingInput({ label, name, value, onChange, error }) {
  return (
    <div className="relative">
      <label className="absolute -top-3 left-3 bg-white px-1 text-xs text-slate-600">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-200`}
      />
      {error && <div className="text-rose-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
