"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Page() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Fetch all questions once
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/exam")
      .then((res) => setAllQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter questions by subject
  useEffect(() => {
    if (!subject) return;
    const filtered = allQuestions.filter((q) => q.subject === subject);
    setQuestions(filtered);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
  }, [subject, allQuestions]);

  // Reset timer on question change
  useEffect(() => {
    if (!questions.length || showResult) return;
    setTimeLeft(questions[currentIndex]?.timeLimit || 0);
  }, [currentIndex, questions, showResult]);

  // Timer effect with auto next question
  useEffect(() => {
    if (!questions.length || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return questions[currentIndex + 1]?.timeLimit || 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, showResult, currentIndex]);

  // Handlers
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentIndex]._id]: option,
    }));
  };

  const handleFinishExam = () => {
    setShowResult(true);
  };

  // Subject selection screen
  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
        <h1 className="text-3xl mb-6 font-semibold">Select Exam Subject</h1>
        <div className="flex gap-4">
          {["front-end", "backend", "mern-stack"].map((subj) => (
            <button
              key={subj}
              onClick={() => setSubject(subj)}
              className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-500"
            >
              {subj}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Loading
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium">
        Loading questions...
      </div>
    );
  }

  // Result view
  if (showResult) {
    return (
      <div className="min-h-screen p-6 ">
        <h1 className="text-3xl font-semibold mb-4">Exam Result</h1>
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 border rounded-lg  shadow">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <p className="mt-1">
                Your answer:{" "}
                <span className="font-semibold">
                  {selectedAnswers[q._id] || "Skipped"}
                </span>
              </p>
              <p className="mt-1">
                Correct answer:{" "}
                <span className="font-semibold text-green-600">{q.answer}</span>
              </p>
              <p
                className={`mt-1 font-medium ${
                  selectedAnswers[q._id] === q.answer ? "text-green-600" : "text-rose-600"
                }`}
              >
                {selectedAnswers[q._id] === q.answer ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Current question
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="pt-16 min-h-screen p-6  flex flex-col items-center">
      {currentQuestion ? (
        <motion.div
          key={currentQuestion._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full p-6  rounded-xl shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl font-semibold">
              {currentIndex + 1}. {currentQuestion.question}
            </h2>
            <span className="text-sm text-slate-500">Time left: {timeLeft}s</span>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(opt)}
                className={`w-full text-left px-4 py-2 rounded-lg border ${
                  selectedAnswers[currentQuestion._id] === opt
                    ? " border-sky-500"
                    : "border-slate-200"
                } hover:bg-sky-100 dark:hover:bg-gray-700`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-400"
            >
              Skip
            </button>

            {/* Next button disabled ONLY if last question */}
            <button
              onClick={handleNext}
              disabled={isLastQuestion}
              className={`px-4 py-2 rounded-lg text-white ${
                isLastQuestion ? "bg-slate-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-500"
              }`}
            >
              Next
            </button>

            <button
              onClick={handleFinishExam}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              Finish Exam
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="min-h-screen flex items-center justify-center text-xl font-medium text-slate-700">
          No more questions available
        </div>
      )}
    </div>
  );
}
