"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Avoid hydration mismatch error
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-all"
    >
      {theme === "light" ? (
        <Moon className="text-gray-800 w-5 h-5" />
      ) : (
        <Sun className="text-yellow-400 w-5 h-5" />
      )}
    </button>
  );
}
