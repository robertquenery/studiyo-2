"use client";

import React from "react";

export default function InstructorGradesPage() {
  const grades = [
    { id: 1, student: "Robert John Quenery", course: "Agile Project Management", grade: "A" },
    { id: 2, student: "Jasmin Angel Bartolome", course: "Agile Project Management", grade: "A-" },
    { id: 3, student: "Arvin Jake Garcia", course: "Agile Project Management", grade: "B+" },
    { id: 4, student: "Jashanpreet Kaur", course: "Agile Project Management", grade: "B" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Grades</h1>
      <p className="text-gray-600 dark:text-gray-300">View and manage student grades</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Student</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Course</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(({ id, student, course, grade }) => (
              <tr key={id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{student}</td>
                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{course}</td>
                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
