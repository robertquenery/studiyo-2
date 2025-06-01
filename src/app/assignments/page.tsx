"use client";

import React from "react";
import { ClipboardList, Calendar, Clock, CheckCircle, AlertCircle, FileText, Upload, Eye } from "lucide-react";

type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  timeLeft: string;
  status: "completed" | "pending" | "overdue" | "in-progress";
  type: string;
  points: number;
  description: string;
  requirements: string[];
};

export default function AssignmentsPage() {
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Risk Assessment Framework Project",
      course: "PGMT 2001 - Project Quality & Risk Management",
      dueDate: "March 15, 2024",
      timeLeft: "3 days left",
      status: "in-progress",
      type: "Individual Project",
      points: 100,
      description: "Develop a comprehensive risk assessment framework for a project scenario.",
      requirements: [
        "Risk identification matrix",
        "Risk probability and impact analysis",
        "Mitigation strategies documentation",
        "Quality assurance plan"
      ]
    },
    {
      id: "2",
      title: "Process Mapping Exercise",
      course: "OPMT 1005 - Process Improvement & Lean",
      dueDate: "March 18, 2024",
      timeLeft: "6 days left",
      status: "pending",
      type: "Case Study",
      points: 75,
      description: "Create a detailed process map and identify improvement opportunities using lean principles.",
      requirements: [
        "Current state process map",
        "Waste identification analysis",
        "Future state design",
        "Implementation recommendations"
      ]
    },
    {
      id: "3",
      title: "Leadership Style Analysis",
      course: "PGMT 2003 - Leadership & Change Management",
      dueDate: "March 10, 2024",
      timeLeft: "Overdue by 2 days",
      status: "overdue",
      type: "Research Paper",
      points: 85,
      description: "Analyze different leadership styles and their effectiveness in change management scenarios.",
      requirements: [
        "Literature review on leadership theories",
        "Case study analysis",
        "Personal leadership assessment",
        "Change management recommendations"
      ]
    },
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
    },
    {
      id: "5",
      title: "Marketing Strategy Presentation",
      course: "MGMT 1006 - Fundamentals of Marketing",
      dueDate: "March 22, 2024",
      timeLeft: "10 days left",
      status: "pending",
      type: "Group Presentation",
      points: 120,
      description: "Develop and present a comprehensive marketing strategy for a chosen product or service.",
      requirements: [
        "Market analysis and segmentation",
        "Marketing mix strategy (4Ps)",
        "Digital marketing components",
        "15-minute presentation with Q&A"
      ]
    }
  ];

  const getStatusColor = (status: Assignment["status"]) => {
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

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Assignments</h1>
        <p className="text-gray-600">Track and manage your course assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assignment List */}
        <div className="lg:col-span-2 space-y-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{assignment.title}</h2>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{assignment.timeLeft}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Requirements:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
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
                  <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Assignment Summary</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Completed</span>
                  <span className="text-green-700 font-medium">1</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">In Progress</span>
                  <span className="text-blue-700 font-medium">1</span>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-700">Pending</span>
                  <span className="text-yellow-700 font-medium">2</span>
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-red-700">Overdue</span>
                  <span className="text-red-700 font-medium">1</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Points Available</span>
                  <span className="text-gray-700 font-medium">430</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Submit assignments before the deadline to avoid penalties</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 text-blue-600" />
                  <span>Read all requirements carefully before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
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
