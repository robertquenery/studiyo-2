"use client";

import React, { useState } from "react";

const discussions = [
  {
    id: 1,
    topic: "Sprint Planning Strategies",
    course: "Agile Project Management",
    author: "Robert John Quenery",
    date: "March 10, 2024",
    replies: 5,
    lastReply: "March 12, 2024",
  },
  {
    id: 2,
    topic: "Retrospective Best Practices",
    course: "Agile Project Management",
    author: "Jasmin Angel Bartolome",
    date: "March 8, 2024",
    replies: 3,
    lastReply: "March 9, 2024",
  },
  {
    id: 3,
    topic: "User Story Mapping",
    course: "Agile Project Management",
    author: "Arvin Jake Garcia",
    date: "March 5, 2024",
    replies: 7,
    lastReply: "March 7, 2024",
  },
  {
    id: 4,
    topic: "Agile Tools and Software",
    course: "Agile Project Management",
    author: "Jashanpreet Kaur",
    date: "March 3, 2024",
    replies: 2,
    lastReply: "March 4, 2024",
  },
];

export default function InstructorDiscussionsPage() {
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Discussions</h1>
      <p className="text-gray-600 dark:text-gray-300">Manage discussions for Agile Project Management</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Topic</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Author</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Replies</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Last Reply</th>
            </tr>
          </thead>
          <tbody>
            {discussions.map(({ id, topic, author, date, replies, lastReply }) => (
              <React.Fragment key={id}>
                <tr
                  className="border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => toggleExpand(id)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{topic}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{author}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{replies}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{lastReply}</td>
                </tr>
                {expandedTopicId === id && (
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td colSpan={5} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {/* Expanded content for the topic */}
                      <p className="mb-2">More detailed information about the topic "{topic}" posted by {author}.</p>
                      <p>This can include the full discussion, attachments, or other relevant details.</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
