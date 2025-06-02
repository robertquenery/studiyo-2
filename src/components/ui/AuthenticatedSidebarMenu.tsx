"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import Logo from "@/components/ui/Logo";
import {
  Home,
  BookOpen,
  FileText,
  Calendar,
  GraduationCap,
  FolderOpen,
  MessageSquare,
  Users,
  User,
  LogOut,
  Gamepad2,
  Menu,
  X
} from "lucide-react";

export default function AuthenticatedSidebarMenu() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || pathname === '/login') {
    return null;
  }

  const menuItems = [
    { href: "/", icon: Home, label: "Overview" },
    { href: "/courses", icon: BookOpen, label: "Courses" },
    { href: "/assignments", icon: FileText, label: "Assignments" },
    { href: "/calendar", icon: Calendar, label: "Schedule" },
    { href: "/grades", icon: GraduationCap, label: "Grades" },
    { href: "/resources", icon: FolderOpen, label: "Resources" },
    { href: "/discussions", icon: Users, label: "Discussions" },
    { href: "/messages", icon: MessageSquare, label: "Messages" },
    { href: "/games", icon: Gamepad2, label: "Games" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-2">
        <Logo size="medium" showText={false} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 md:translate-x-0 md:static md:flex" : "-translate-x-full md:-translate-x-full md:absolute md:flex"}`} style={{ willChange: 'transform' }}>
        <div className="p-2 border-b border-gray-200 flex justify-center items-center relative">
          <div>
            <Logo size="medium" showText={false} />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Collapse sidebar"
            className="absolute right-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Student
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                pathname === "/profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Fixed toggle button when sidebar is collapsed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
          className="fixed top-4 left-4 z-70 p-2 rounded-md text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
