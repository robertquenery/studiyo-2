"use client";

import React from "react";
import { BookOpen, FileText, Video, Download, Presentation, FileSpreadsheet, BarChart, Users, Award, Calendar } from "lucide-react";

const teachingResources = [
  {
    category: "Lecture Materials",
    resources: [
      { name: "Agile Fundamentals Slides", type: "PPTX", size: "3.2 MB", description: "Comprehensive slides covering Agile principles and practices" },
      { name: "Scrum Framework Presentation", type: "PPTX", size: "2.8 MB", description: "Detailed presentation on Scrum roles, events, and artifacts" },
      { name: "Kanban vs Scrum Comparison", type: "PDF", size: "1.5 MB", description: "Visual guide comparing Kanban and Scrum methodologies" },
    ]
  },
  {
    category: "Lesson Plans",
    resources: [
      { name: "Sprint Planning Workshop Guide", type: "PDF", size: "2.1 MB", description: "Step-by-step guide for conducting sprint planning sessions" },
      { name: "Agile Retrospective Activities", type: "DOCX", size: "1.8 MB", description: "Collection of retrospective formats and activities" },
      { name: "User Story Writing Workshop", type: "PDF", size: "1.2 MB", description: "Interactive workshop for teaching user story creation" },
    ]
  }
];

const assessmentTools = [
  {
    name: "Agile Project Rubric",
    description: "Detailed rubric for evaluating Agile project submissions",
    type: "PDF",
    size: "350 KB"
  },
  {
    name: "Sprint Review Checklist",
    description: "Checklist for conducting effective sprint review sessions",
    type: "PDF",
    size: "280 KB"
  },
  {
    name: "Team Collaboration Assessment",
    description: "Tool for evaluating team dynamics and collaboration",
    type: "XLSX",
    size: "1.1 MB"
  }
];

const studentResources = [
  {
    course: "Agile Project Management",
    materials: [
      { name: "Scrum Framework Basics", type: "Video", size: "42 min" },
      { name: "Sprint Planning Template", type: "PDF", size: "1.5 MB" },
      { name: "Agile Retrospectives", type: "Video", size: "38 min" },
      { name: "Kanban Board Implementation Guide", type: "PDF", size: "2.1 MB" },
      { name: "User Story Writing Workshop", type: "Video", size: "55 min" },
      { name: "Agile Metrics and KPIs", type: "PDF", size: "1.8 MB" },
    ]
  }
];

const professionalDevelopment = [
  {
    name: "Agile Certification Pathways",
    description: "Guide to Scrum Master and Agile Coach certifications",
    icon: <Award className="w-6 h-6" />,
  },
  {
    name: "Latest Agile Trends",
    description: "Industry updates and emerging Agile practices",
    icon: <BarChart className="w-6 h-6" />,
  },
  {
    name: "Community of Practice",
    description: "Networking opportunities with other Agile practitioners",
    icon: <Users className="w-6 h-6" />,
  }
];

export default function InstructorResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Instructor Resources</h1>
        <p className="text-gray-600 dark:text-gray-300">Teaching materials and tools for Agile Project Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teaching Resources */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Presentation className="w-5 h-5" />
              Teaching Resources
            </h2>
            <div className="space-y-6">
              {teachingResources.map((section, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{section.category}</h3>
                  <div className="space-y-3">
                    {section.resources.map((resource, rIndex) => (
                      <div key={rIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          {resource.type === "PDF" ? (
                            <FileText className="w-5 h-5 text-blue-600" />
                          ) : resource.type === "PPTX" ? (
                            <Presentation className="w-5 h-5 text-blue-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{resource.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{resource.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{resource.size}</p>
                          </div>
                        </div>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <FileSpreadsheet className="w-5 h-5" />
              Assessment Tools
            </h2>
            <div className="space-y-3">
              {assessmentTools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{tool.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tool.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Student Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <BookOpen className="w-5 h-5" />
              Student Resources
            </h2>
            <div className="space-y-6">
              {studentResources.map((course, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{course.course}</h3>
                  <div className="space-y-3">
                    {course.materials.map((material, mIndex) => (
                      <div key={mIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          {material.type === "PDF" ? (
                            <FileText className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Video className="w-5 h-5 text-blue-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{material.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{material.size}</p>
                          </div>
                        </div>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Development */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Calendar className="w-5 h-5" />
              Professional Development
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {professionalDevelopment.map((tool, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-4">
                  <div className="text-blue-600">{tool.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
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
