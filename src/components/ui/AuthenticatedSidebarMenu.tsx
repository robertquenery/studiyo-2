"use client";

import React from "react";
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
  Gamepad2
} from "lucide-react";

export default function AuthenticatedSidebarMenu() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

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
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-2 border-b border-gray-200 flex justify-center items-center">
        <Logo size="medium" showText={false} className="-mt-8 -mb-8" />
      </div>

      <nav className="flex-1 p-4">
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
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
