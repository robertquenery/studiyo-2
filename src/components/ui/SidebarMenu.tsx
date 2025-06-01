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
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold">Studiyo</h2>
        <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          <li>
            <Link href="/" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <HomeIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Overview</span>
            </Link>
          </li>
          <li>
            <Link href="/courses" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <BookOpenIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Courses</span>
            </Link>
          </li>
          <li>
            <Link href="/assignments" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <ClipboardListIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Assignments</span>
            </Link>
          </li>
          <li>
            <Link href="/calendar" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Schedule</span>
            </Link>
          </li>
          <li>
            <Link href="/grades" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <GraduationCapIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Grades</span>
            </Link>
          </li>
          <li>
            <Link href="/resources" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <BookIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Resources</span>
            </Link>
          </li>
          <li>
            <Link href="/discussions" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <UsersIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Discussions</span>
            </Link>
          </li>
          <li>
            <Link href="/messages" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <MessageSquareIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Messages</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
              <UserIcon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-medium">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-3 rounded text-center text-blue-700 font-semibold">
          Pro Certification!<br />
          Get a verified certification from the other university
        </div>
      </div>
    </aside>
  );
}
