"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ClipboardList, Bell, Clock, Star, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function InstructorDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState("Instructor");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const checkUserRoleAndRedirect = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== "instructor") {
            router.push("/");
            return;
          }
          if (userData.fullName) {
            setUserName(userData.fullName.split(" ")[0]); // Get first name only
          }
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    checkUserRoleAndRedirect();
  }, [user, router]);

  // Placeholder data for instructor dashboard
  const quickStats = [
    { label: "Courses Managed", value: "3", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Assignments Created", value: "12", icon: <ClipboardList className="w-5 h-5" /> },
    { label: "Active Students", value: "120", icon: <Users className="w-5 h-5" /> },
    { label: "Average Grade", value: "B+", icon: <Star className="w-5 h-5" /> },
  ];

  const upcomingEvents = [
    {
      title: "Midterm Exam Preparation",
      course: "PGMT 2001 - Project Quality & Risk Management",
      date: "March 20, 2024",
      status: "scheduled",
    },
    {
      title: "Assignment Review Meeting",
      course: "OPMT 1005 - Process Improvement & Lean",
      date: "March 25, 2024",
      status: "pending",
    },
  ];

  const announcements = [
    {
      title: "Faculty Meeting",
      content: "Monthly faculty meeting scheduled for next Monday at 10 AM in Room 101.",
      date: "2 days ago",
      priority: "high",
    },
    {
      title: "New Course Materials",
      content: "Updated lecture slides and notes are now available in Resources.",
      date: "5 days ago",
      priority: "normal",
    },
  ];

  const recentActivity = [
    {
      action: "Graded Assignments",
      details: "PGMT 2001 - Project Quality & Risk Management",
      time: "3 hours ago",
    },
    {
      action: "Posted Announcement",
      details: "OPMT 1005 - Process Improvement & Lean",
      time: "1 day ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Here&apos;s an overview of your instructor activities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-blue-600">{stat.icon}</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <ClipboardList className="w-5 h-5" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <button
                  key={index}
                  onClick={() => (window.location.href = `/instructor/courses/${event.course.split(" ")[0].toLowerCase()}`)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 group-hover:bg-gray-100 dark:group-hover:bg-gray-600">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{event.course}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.date}</div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          event.status === "scheduled"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {event.status === "scheduled" ? "Scheduled" : "Pending"}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <button
                  key={index}
                  onClick={() => (window.location.href = `/instructor/courses/${activity.details.split(" - ")[1]?.toLowerCase()}`)}
                  className="w-full text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{activity.action}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{activity.details}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Bell className="w-5 h-5" />
              Announcements
            </h2>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        announcement.priority === "high"
                          ? "bg-red-500"
                          : announcement.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{announcement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
