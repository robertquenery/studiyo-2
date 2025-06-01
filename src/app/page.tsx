"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ClipboardList, Calendar, Bell, TrendingUp, Clock, Star, Users } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardPage() {
  const { user } = useAuth();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.fullName) {
            setUserName(userData.fullName.split(' ')[0]); // Get first name only
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    loadUserProfile();
  }, [user]);

  const quickStats = [
    { label: "Current GPA", value: "3.70", icon: <Star className="w-5 h-5" /> },
    { label: "Courses", value: "5", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Assignments", value: "5", icon: <ClipboardList className="w-5 h-5" /> },
    { label: "Study Groups", value: "5", icon: <Users className="w-5 h-5" /> },
  ];

  const upcomingAssignments = [
    {
      title: "Risk Assessment Framework Project",
      course: "PGMT 2001 - Project Quality & Risk Management",
      dueDate: "March 15, 2024",
      status: "in-progress"
    },
    {
      title: "Process Mapping Exercise",
      course: "OPMT 1005 - Process Improvement & Lean",
      dueDate: "March 18, 2024",
      status: "pending"
    },
    {
      title: "Marketing Strategy Presentation",
      course: "MGMT 1006 - Fundamentals of Marketing",
      dueDate: "March 22, 2024",
      status: "pending"
    }
  ];

  const announcements = [
    {
      title: "Project Management Workshop",
      content: "Join Curtis Chang for an advanced risk assessment workshop this Friday at 2 PM in Room 301.",
      date: "1 hour ago",
      priority: "high"
    },
    {
      title: "Study Group Sessions",
      content: "42C Study Group is meeting tonight at 7 PM in the library. All members welcome!",
      date: "3 hours ago",
      priority: "medium"
    },
    {
      title: "New Course Materials",
      content: "Updated process mapping templates and agile methodology guides are now available in Resources.",
      date: "1 day ago",
      priority: "normal"
    }
  ];

  const recentActivity = [
    {
      action: "Completed Quiz",
      details: "Agile Methodology Quiz - PGMT 2002",
      time: "2 hours ago"
    },
    {
      action: "Joined Study Group",
      details: "42C Study Group - General Discussion",
      time: "5 hours ago"
    },
    {
      action: "Downloaded Resource",
      details: "Risk Assessment Templates - PGMT 2001",
      time: "Yesterday"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-gray-600">Here's an overview of your academic progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-blue-600">{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Assignments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Upcoming Assignments
            </h2>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = `/courses/${assignment.course.split(' ')[0].toLowerCase()}`}
                  className="w-full text-left group"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 group-hover:bg-gray-100">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{assignment.dueDate}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {assignment.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = `/courses/${activity.details.split(' - ')[1].toLowerCase()}`}
                  className="w-full text-left transition-all duration-200 hover:bg-gray-100"
                >
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.action}</h3>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Announcements
            </h2>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${
                      announcement.priority === 'high' ? 'bg-red-500' :
                      announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                    <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500">{announcement.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
