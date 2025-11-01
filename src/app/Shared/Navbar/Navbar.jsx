"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ import this
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ get current route

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Exam", href: "/exam" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Career<span className="text-gray-800">Boots</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-2 rounded-md px-2 ${
                    isActive
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="flex flex-col gap-2 mt-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
