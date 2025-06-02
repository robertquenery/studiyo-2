"use client";

import React from "react";
import { GraduationCap, History, Award } from "lucide-react";

export default function GradesPage() {
  const currentGrades = [
    {
      course: "Project Quality & Risk Management",
      code: "PGMT 2001",
      grade: "A-",
      percentage: 92,
      credits: 3,
    },
    {
      course: "Process Improvement & Lean",
      code: "OPMT 1005",
      grade: "B+",
      percentage: 87,
      credits: 3,
    },
    {
      course: "Leadership & Change Management",
      code: "PGMT 2003",
      grade: "A",
      percentage: 95,
      credits: 3,
    },
    {
      course: "Agile Project Management",
      code: "PGMT 2002",
      grade: "A-",
      percentage: 90,
      credits: 3,
    },
    {
      course: "Fundamentals of Marketing",
      code: "MGMT 1006",
      grade: "B+",
      percentage: 85,
      credits: 3,
    },
  ];

  const gradeHistory = [
    {
      semester: "Fall 2023",
      gpa: 3.75,
      courses: [
        { course: "Business Communication", grade: "A", credits: 3 },
        { course: "Introduction to Management", grade: "A-", credits: 3 },
        { course: "Business Statistics", grade: "B+", credits: 3 },
        { course: "Organizational Behavior", grade: "A", credits: 3 },
      ],
    },
    {
      semester: "Spring 2023",
      gpa: 3.65,
      courses: [
        { course: "Project Management Fundamentals", grade: "A-", credits: 3 },
        { course: "Operations Management", grade: "B+", credits: 3 },
        { course: "Strategic Planning", grade: "A", credits: 3 },
        { course: "Quality Management", grade: "B+", credits: 3 },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Grades</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your academic performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Semester Grades */}
        <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <GraduationCap className="w-5 h-5" />
          Current Semester
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGrades.map((course, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{course.course}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{course.code}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{course.credits}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded">
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                        style={{ width: `${course.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{course.percentage}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>

        {/* GPA Summary */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Award className="w-5 h-5" />
              GPA Summary
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">3.70</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Current Semester GPA</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">3.70</div>
                <div className="text-sm text-green-600 dark:text-green-400">Cumulative GPA</div>
              </div>
            </div>
          </div>

          {/* Grade History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <History className="w-5 h-5" />
              Grade History
            </h2>
            <div className="space-y-4">
              {gradeHistory.map((semester, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{semester.semester}</h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-300">GPA: {semester.gpa}</span>
                  </div>
                  <div className="space-y-2">
                    {semester.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{course.course}</span>
                        <span className="font-medium">{course.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
