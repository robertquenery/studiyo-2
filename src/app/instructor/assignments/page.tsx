"use client";

import React from "react";
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Eye, Users, BookOpen, Award } from "lucide-react";

type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  timeLeft: string;
  status: "completed" | "pending" | "overdue" | "in-progress" | "needs-grading" | "graded";
  type: string;
  points: number;
  description: string;
  requirements: string[];
  submissions?: number;
  totalStudents?: number;
};

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Agile Methodology Quiz",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 8, 2024",
    timeLeft: "Completed",
    status: "graded",
    type: "Online Quiz",
    points: 50,
    description: "Assessment on Scrum framework, sprint planning, and agile best practices.",
    requirements: [
      "Scrum roles and responsibilities",
      "Sprint planning concepts",
      "Agile ceremonies understanding",
      "Time limit: 45 minutes"
    ],
    submissions: 15,
    totalStudents: 15
  },
  {
    id: "2",
    title: "Sprint Planning Workshop",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 15, 2024",
    timeLeft: "3 days left",
    status: "needs-grading",
    type: "Group Activity",
    points: 100,
    description: "Plan and execute a sprint for a software development project using Scrum framework.",
    requirements: [
      "Create sprint backlog from product backlog",
      "Assign user stories to team members",
      "Estimate effort using story points",
      "Define sprint goal and deliverables"
    ],
    submissions: 12,
    totalStudents: 15
  },
  {
    id: "3",
    title: "Agile Retrospective Report",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 18, 2024",
    timeLeft: "6 days left",
    status: "in-progress",
    type: "Individual Report",
    points: 75,
    description: "Conduct a retrospective analysis of a completed sprint and propose improvements.",
    requirements: [
      "Identify what went well and what didn't",
      "Analyze team dynamics and processes",
      "Propose actionable improvement items",
      "Create a follow-up plan for next sprint"
    ],
    submissions: 8,
    totalStudents: 15
  },
  {
    id: "4",
    title: "Kanban Board Implementation",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 22, 2024",
    timeLeft: "10 days left",
    status: "pending",
    type: "Project",
    points: 120,
    description: "Design and implement a Kanban board for a real-world project workflow.",
    requirements: [
      "Create visual workflow with columns",
      "Define work-in-progress limits",
      "Implement pull-based workflow",
      "Track and measure flow metrics"
    ]
  },
  {
    id: "5",
    title: "User Story Creation Exercise",
    course: "PGMT 2002 - Agile Project Management",
    dueDate: "March 10, 2024",
    timeLeft: "Overdue by 2 days",
    status: "overdue",
    type: "Individual Assignment",
    points: 85,
    description: "Write comprehensive user stories for an e-commerce platform following INVEST criteria.",
    requirements: [
      "Create 10 user stories for core features",
      "Define acceptance criteria for each story",
      "Estimate story points using planning poker",
      "Prioritize stories in a backlog"
    ],
    submissions: 5,
    totalStudents: 15
  }
];

const getStatusColor = (status: Assignment["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "graded":
      return "bg-green-100 text-green-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "overdue":
      return "bg-red-100 text-red-700";
    case "needs-grading":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusIcon = (status: Assignment["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5" />;
    case "graded":
      return <CheckCircle className="w-5 h-5" />;
    case "overdue":
      return <AlertCircle className="w-5 h-5" />;
    case "needs-grading":
      return <FileText className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export default function InstructorAssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Assignments</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage and grade course assignments</p>
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
                    {assignment.status === "needs-grading" ? "Needs Grading" : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{assignment.timeLeft}</span>
                  </div>
                  {assignment.submissions !== undefined && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
                    </div>
                  )}
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

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Submissions
                  </button>
                  {assignment.status === "needs-grading" && (
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Grade Assignment
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Edit Assignment
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
                  <span className="text-green-700 dark:text-green-300">Graded</span>
                  <span className="text-green-700 dark:text-green-300 font-medium">1</span>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-purple-700 dark:text-purple-300">Needs Grading</span>
                  <span className="text-purple-700 dark:text-purple-300 font-medium">1</span>
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
                  <span className="text-yellow-700 dark:text-yellow-300 font-medium">1</span>
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
                  <span className="text-gray-700 dark:text-gray-300">Total Assignments</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">5</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Grade assignments within 48 hours of due date</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Provide detailed feedback for better student outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-300" />
                  <span>Follow up on overdue assignments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
