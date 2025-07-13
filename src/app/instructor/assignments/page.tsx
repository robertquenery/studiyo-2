"use client";

import React from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Upload, Eye } from "lucide-react";

const assignments = [
  {
    id: "4",
    title: "Agile Methodology Quiz",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 8, 2024",
    timeLeft: "Completed",
    status: "completed",
    type: "Online Quiz",
    points: 50,
    description: "Assessment on Scrum framework, sprint planning, and agile best practices.",
    requirements: [
      "Scrum roles and responsibilities",
      "Sprint planning concepts",
      "Agile ceremonies understanding",
      "Time limit: 45 minutes"
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5" />;
    case "overdue":
      return <AlertCircle className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export default function InstructorAssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Assignments</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and manage your course assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assignment List */}
        <div className="lg:col-span-2 space-y-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{assignment.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.course}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{assignment.timeLeft}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Requirements:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {assignment.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  {assignment.status !== "completed" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Submit Assignment
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Assignment Summary</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 dark:text-green-300">Completed</span>
                  <span className="text-green-700 dark:text-green-300 font-medium">1</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300">In Progress</span>
                  <span className="text-blue-700 dark:text-blue-300 font-medium">1</span>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-700 dark:text-yellow-300">Pending</span>
                  <span className="text-yellow-700 dark:text-yellow-300 font-medium">2</span>
                </div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-red-700 dark:text-red-300">Overdue</span>
                  <span className="text-red-700 dark:text-red-300 font-medium">1</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Total Points Available</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">430</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Submit assignments before the deadline to avoid penalties</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Read all requirements carefully before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Double-check your work before submission</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
