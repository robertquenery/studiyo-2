"use client";

import React from "react";
import { BookOpen, FileText, Video, Download, Book, Calculator, Globe, Search } from "lucide-react";

const courseResources = [
  {
    course: "Agile Project Management",
    materials: [
      { name: "Scrum Framework Basics", type: "Video", size: "42 min" },
      { name: "Sprint Planning Template", type: "PDF", size: "1.5 MB" },
      { name: "Agile Retrospectives", type: "Video", size: "38 min" },
    ]
  }
];

const digitalLibrary = [
  {
    category: "Textbooks",
    resources: [
      { type: "textbook", name: "Project Management: A Systems Approach", author: "Harold Kerzner", year: "2023" },
      { type: "textbook", name: "Lean Six Sigma and Minitab", author: "QSB Consulting", year: "2023" },
    ]
  },
  {
    category: "Academic Journals",
    resources: [
      { type: "journal", name: "Project Management Journal", publisher: "PMI", access: "Full" },
      { type: "journal", name: "Quality Management Journal", publisher: "ASQ", access: "Full" },
    ]
  }
];

const studyTools = [
  {
    name: "Project Planning Tools",
    description: "Gantt charts, WBS, and project templates",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    name: "Process Mapping Software",
    description: "Create and analyze process flows",
    icon: <Globe className="w-6 h-6" />,
  }
];

export default function InstructorResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Learning Resources</h1>
        <p className="text-gray-600 dark:text-gray-300">Access course materials and study tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Materials */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <BookOpen className="w-5 h-5" />
              Course Materials
            </h2>
            <div className="space-y-6">
              {courseResources.map((course, index) => (
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
        </div>

        <div>
          {/* Digital Library */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Book className="w-5 h-5" />
              Digital Library
            </h2>
            <div className="space-y-6">
              {digitalLibrary.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">{section.category}</h3>
                  <div className="space-y-3">
                    {section.resources.map((resource, rIndex) => (
                      <div key={rIndex} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{resource.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.type === "textbook" 
                            ? `${resource.author} • ${resource.year}`
                            : `${resource.publisher} • ${resource.access}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Calculator className="w-5 h-5" />
              Study Tools
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {studyTools.map((tool, index) => (
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
