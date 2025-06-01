"use client";

import React from "react";
import { BookOpen, Users, Clock, Calendar, ChevronRight, Play, FileText, Download, User } from "lucide-react";

type Course = {
  id: string;
  code: string;
  name: string;
  instructor: string;
  progress: number;
  schedule: string;
  students: number;
  nextClass: string;
  materials: {
    title: string;
    type: "video" | "document";
    size?: string;
    duration?: string;
  }[];
};

export default function CoursesPage() {
  const courses: Course[] = [
    {
      id: "1",
      code: "PGMT 2001",
      name: "Project Quality & Risk Management",
      instructor: "Curtis Chang",
      progress: 65,
      schedule: "Mon, Wed 10:00 AM",
      students: 120,
      nextClass: "Tomorrow at 10:00 AM",
      materials: [
        { title: "Risk Assessment Framework", type: "video", duration: "45 min" },
        { title: "Quality Management Standards", type: "document", size: "2.4 MB" },
        { title: "Project Risk Analysis", type: "video", duration: "55 min" },
      ]
    },
    {
      id: "2",
      code: "OPMT 1005",
      name: "Process Improvement & Lean",
      instructor: "Moataz El-Menshawy",
      progress: 45,
      schedule: "Tue, Thu 2:00 PM",
      students: 85,
      nextClass: "Thursday at 2:00 PM",
      materials: [
        { title: "Lean Principles Overview", type: "video", duration: "50 min" },
        { title: "Process Mapping Exercises", type: "document", size: "1.8 MB" },
        { title: "Continuous Improvement", type: "video", duration: "40 min" },
      ]
    },
    {
      id: "3",
      code: "PGMT 2003",
      name: "Leadership & Change Management",
      instructor: "Gabriella Marques",
      progress: 80,
      schedule: "Fri 1:00 PM",
      students: 45,
      nextClass: "Friday at 1:00 PM",
      materials: [
        { title: "Leadership Styles Guide", type: "document", size: "1.2 MB" },
        { title: "Change Management Models", type: "video", duration: "35 min" },
        { title: "Team Leadership Strategies", type: "document", size: "856 KB" },
      ]
    },
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
    },
    {
      id: "5",
      code: "MGMT 1006",
      name: "Fundamentals of Marketing",
      instructor: "Kristin Matheson",
      progress: 30,
      schedule: "Tue, Thu 11:00 AM",
      students: 110,
      nextClass: "Tuesday at 11:00 AM",
      materials: [
        { title: "Marketing Mix Principles", type: "video", duration: "48 min" },
        { title: "Consumer Behavior Analysis", type: "document", size: "2.1 MB" },
        { title: "Digital Marketing Trends", type: "video", duration: "52 min" },
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600">View and manage your enrolled courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Cards */}
        <div className="lg:col-span-2 space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Course Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{course.name}</h2>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                  <button 
                    onClick={() => window.location.href = `/courses/${course.code.toLowerCase()}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Course
                  </button>
                </div>

                {/* Course Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.nextClass}</span>
                  </div>
                </div>
              </div>

              {/* Course Materials */}
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Materials</h3>
                <div className="space-y-3">
                  {course.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {material.type === "video" ? (
                          <Play className="w-5 h-5 text-blue-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-600" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{material.title}</p>
                          <p className="text-xs text-gray-500">
                            {material.type === "video" ? material.duration : material.size}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          // In a real app, this would trigger a download
                          alert(`Downloading: ${material.title}`);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Course Instructors</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{course.instructor}</h3>
                    <p className="text-sm text-gray-600">{course.code}</p>
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
