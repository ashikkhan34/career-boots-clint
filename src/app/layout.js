import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";
import ThemeProviderWrapper from "./Components/ThemeProviderWrapper/ThemeProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Boots",
  description: "Career development platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ✅ ThemeProviderWrapper এখানে পুরো body কে wrap করবে */}
      <ThemeProviderWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 transition-colors`}
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </ThemeProviderWrapper>
    </html>
  );
}
