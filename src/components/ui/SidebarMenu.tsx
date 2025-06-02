"use client";

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  CalendarIcon,
  GraduationCapIcon,
  BookIcon,
  UsersIcon,
  MessageSquareIcon
} from "lucide-react";

export default function SidebarMenu() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Studiyo</h2>
        <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          <li>
            <Link href="/" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <HomeIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Overview</span>
            </Link>
          </li>
          <li>
            <Link href="/courses" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <BookOpenIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Courses</span>
            </Link>
          </li>
          <li>
            <Link href="/assignments" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <ClipboardListIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Assignments</span>
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Schedule</span>
            </Link>
          </li>
          <li>
            <Link href="/grades" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <GraduationCapIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Grades</span>
            </Link>
          </li>
          <li>
            <Link href="/resources" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <BookIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Resources</span>
            </Link>
          </li>
          <li>
            <Link href="/discussions" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <UsersIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Discussions</span>
            </Link>
          </li>
          <li>
            <Link href="/messages" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <MessageSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Messages</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-800 dark:text-gray-200 font-medium">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded text-center text-blue-700 dark:text-blue-300 font-semibold">
          Pro Certification!<br />
          Get a verified certification from the other university
        </div>
      </div>
    </aside>
  );
}
