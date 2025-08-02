"use client";

import React from "react";
import { MessageCircle, Users, HelpCircle, BookOpen, MessageSquare, ThumbsUp, Eye, Plus } from "lucide-react";

type Discussion = {
  id: string;
  title: string;
  course: string;
  author: string;
  date: string;
  replies: number;
  views: number;
  likes: number;
  tags: string[];
};

type StudyGroup = {
  id: string;
  name: string;
  course: string;
  members: number;
  topics: string[];
  lastActive: string;
};

export default function InstructorDiscussionsPage() {
  const discussions: Discussion[] = [
    {
      id: "1",
      title: "Sprint Planning Strategies",
      course: "Agile Project Management",
      author: "Robert John Quenery",
      date: "2 hours ago",
      replies: 8,
      views: 45,
      likes: 12,
      tags: ["Agile", "Scrum", "PGMT2002"]
    },
    {
      id: "2",
      title: "Retrospective Best Practices",
      course: "Agile Project Management",
      author: "Jasmin Angel Bartolome",
      date: "5 hours ago",
      replies: 15,
      views: 92,
      likes: 18,
      tags: ["Agile", "Retrospective", "PGMT2002"]
    },
    {
      id: "3",
      title: "User Story Mapping",
      course: "Agile Project Management",
      author: "Arvin Jake Garcia",
      date: "1 day ago",
      replies: 10,
      views: 78,
      likes: 14,
      tags: ["Agile", "User Stories", "PGMT2002"]
    },
    {
      id: "4",
      title: "Agile Tools and Software",
      course: "Agile Project Management",
      author: "Jashanpreet Kaur",
      date: "3 hours ago",
      replies: 6,
      views: 55,
      likes: 9,
      tags: ["Tools", "Software", "PGMT2002"]
    },
    {
      id: "5",
      title: "Sprint Review Feedback",
      course: "Agile Project Management",
      author: "David Chen",
      date: "4 hours ago",
      replies: 12,
      views: 85,
      likes: 16,
      tags: ["Sprint", "Review", "PGMT2002"]
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: "1",
      name: "Agile Practitioners",
      course: "Agile Project Management",
      members: 20,
      topics: ["Scrum", "Sprint Planning", "Agile Tools"],
      lastActive: "30 minutes ago"
    },
    {
      id: "2",
      name: "Agile Coaches Network",
      course: "Agile Project Management",
      members: 15,
      topics: ["Coaching", "Mentoring", "Team Dynamics"],
      lastActive: "1 hour ago"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Discussions</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage discussions for your courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Discussion Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <MessageCircle className="w-5 h-5" />
                Recent Discussions
              </h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Discussion
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 cursor-pointer">
                      {discussion.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{discussion.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{discussion.course}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {discussion.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {discussion.likes} likes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Study Groups */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Users className="w-5 h-5" />
              Study Groups
            </h2>
            <div className="space-y-4">
              {studyGroups.map((group) => (
                <div key={group.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{group.course}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {group.topics.map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{group.members} members</span>
                    <span>Active {group.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Create Study Group
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Answer Student Questions</span>
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Course Announcements</span>
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span>View All Study Groups</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
