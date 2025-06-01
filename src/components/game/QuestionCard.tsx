"use client";

import React from "react";
import { motion } from "framer-motion";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionCardProps {
  question: string;
  answers: Answer[];
  timeLeft: number;
  onAnswerSelect: (answerId: string) => void;
  isAnswered: boolean;
}

const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f"];
const QUESTION_TIME = 20; // seconds per question
const MAX_POINTS = 1000; // maximum points per question

export default function QuestionCard({
  question,
  answers,
  timeLeft,
  onAnswerSelect,
  isAnswered,
}: QuestionCardProps) {
  // Calculate potential points based on time remaining
  const potentialPoints = Math.max(100, Math.floor((timeLeft / QUESTION_TIME) * MAX_POINTS));

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Timer Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 20) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">{question}</h2>
        <div className="flex justify-between items-center text-center">
          <p className="text-gray-600">Time left: {timeLeft}s</p>
          <p className="text-green-600 font-semibold">
            Potential points: {potentialPoints}
          </p>
        </div>
      </div>

      {/* Answers Grid */}
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <button
            key={answer.id}
            onClick={() => !isAnswered && onAnswerSelect(answer.id)}
            disabled={isAnswered}
            className={`p-6 rounded-lg text-white font-bold text-lg transition-transform hover:scale-105 ${
              isAnswered ? "opacity-50" : ""
            }`}
            style={{ backgroundColor: colors[index] }}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
