"use client";

import React from "react";
import { Calendar, Clock, Play, FileText, Download, User, Users } from "lucide-react";

const courses = [
  {
    id: "4",
    code: "PGMT 2002",
    name: "Agile Project Management",
    instructor: "Charles Chen",
    progress: 55,
    schedule: "Mon, Wed 2:00 PM",
    students: 95,
    nextClass: "Monday at 2:00 PM",
    materials: [
      { title: "Scrum Framework Basics", type: "video", duration: "42 min" },
      { title: "Sprint Planning Template", type: "document", size: "1.5 MB" },
      { title: "Agile Retrospectives", type: "video", duration: "38 min" },
    ]
  }
];

export default function InstructorCoursesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-300">View and manage your courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Cards */}
        <div className="lg:col-span-2 space-y-6">
          {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {/* Course Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{course.code}</p>
                </div>
                <button 
                  onClick={() => window.location.href = `/instructor/courses/${course.code.toLowerCase()}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Course
                </button>
              </div>

                {/* Course Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{course.nextClass}</span>
                  </div>
                </div>
              </div>

                {/* Course Materials */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Recent Materials</h3>
                  <div className="space-y-3">
                    {course.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          {material.type === "video" ? (
                            <Play className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{material.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {material.type === "video" ? material.duration : material.size}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            // In a real app, this would trigger a download
                            alert(`Downloading: ${material.title}`);
                          }}
                          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                          title={`Download ${material.title}`}
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        {/* Instructors */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Course Instructors</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{course.instructor}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{course.code}</p>
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
