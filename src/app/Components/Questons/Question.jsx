"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/question/");
        setQuestions(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-2xl ">{error}</div>;


  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 mt-10 ">
      <h1 className="text-3xl font-bold text-center mb-8 ">
        Questions & Answers ({questions.length})
      </h1>

      <Accordion type="single" collapsible className="w-full">
        {questions.map((item) => (
          <AccordionItem className=' p-4 border-l-4 border-blue-700 rounded-2xl' key={item._id} value={`item-${item._id}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 dark:text-white leading-relaxed">
              {item.sampleAnswer || "No answer available yet."}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
