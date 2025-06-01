"use client";

import React from "react";

interface Course {
  id: string;
  title: string;
  description: string;
}

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
  },
  {
    id: "2",
    title: "Web Development",
    description: "Build modern web applications using React and Next.js.",
  },
];

export default function CourseList() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <ul className="space-y-4">
        {sampleCourses.map((course) => (
          <li key={course.id} className="border p-4 rounded hover:shadow-md transition">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
