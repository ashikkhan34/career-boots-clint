"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ new line

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function MentorCarousel() {
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // ✅ router initialize

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/mentor/");
        setMentors(res.data.data || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to load mentors 😔");
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading mentors...</div>;

  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Mentors ({mentors.length})
      </h1>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {mentors.map((mentor) => (
            <CarouselItem key={mentor._id} className="md:basis-1/3">
              <div className="p-2">
                {/* ✅ পুরো কার্ড ক্লিকেবল */}
                <Card
                  onClick={() => router.push(`/MentorDetails/${mentor._id}`)}
                  className="hover:shadow-2xl shadow-blue-800 transition-all cursor-pointer"
                >
                  <CardContent className="flex flex-col justify-center p-4">
                    <Image
                      height={100}
                      width={200}
                      src={mentor.image || "/default-avatar.png"}
                      alt={mentor.name}
                      className="w-full h-52 rounded-xl object-cover mb-4 border"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {mentor.name}
                    </h2>
                    <p>📧 {mentor.email}</p>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                      Experience: {mentor.experience}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rating: ⭐ {mentor.rating}
                    </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
