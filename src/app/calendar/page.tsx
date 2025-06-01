"use client";

import React from "react";
import { Calendar, Clock, BookOpen, ClipboardList } from "lucide-react";

export default function CalendarPage() {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "10:00 AM", course: "Project Quality & Risk Management", room: "Room 301" },
        { time: "2:00 PM", course: "Agile Project Management", room: "Room 302" }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        { time: "11:00 AM", course: "Fundamentals of Marketing", room: "Room 405" },
        { time: "2:00 PM", course: "Process Improvement & Lean", room: "Room 303" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { time: "10:00 AM", course: "Project Quality & Risk Management", room: "Room 301" },
        { time: "2:00 PM", course: "Agile Project Management", room: "Room 302" }
      ]
    },
    {
      day: "Thursday",
      classes: [
        { time: "11:00 AM", course: "Fundamentals of Marketing", room: "Room 405" },
        { time: "2:00 PM", course: "Process Improvement & Lean", room: "Room 303" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { time: "1:00 PM", course: "Leadership & Change Management", room: "Room 304" }
      ]
    }
  ];

  const upcomingEvents = [
    {
      title: "Risk Assessment Project Due",
      course: "Project Quality & Risk Management",
      date: "March 15, 2024",
      time: "11:59 PM"
    },
    {
      title: "Process Mapping Presentation",
      course: "Process Improvement & Lean",
      date: "March 18, 2024",
      time: "2:00 PM"
    },
    {
      title: "Leadership Analysis Submission",
      course: "Leadership & Change Management",
      date: "March 20, 2024",
      time: "11:59 PM"
    },
    {
      title: "Sprint Planning Session",
      course: "Agile Project Management",
      date: "March 21, 2024",
      time: "2:00 PM"
    },
    {
      title: "Marketing Strategy Presentation",
      course: "Fundamentals of Marketing",
      date: "March 22, 2024",
      time: "11:00 AM"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Schedule</h1>
        <p className="text-gray-600">Manage your classes and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Time
                    </th>
                    {weekDays.map((day) => (
                      <th key={day} className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="px-4 py-2 border-b border-gray-200 text-sm">
                        {time}
                      </td>
                      {weekDays.map((day) => {
                        const classInfo = schedule.find(s => s.day === day)?.classes.find(c => c.time === time);
                        return (
                          <td key={`${day}-${time}`} className="px-4 py-2 border-b border-gray-200">
                            {classInfo && (
                              <div className="bg-blue-50 p-2 rounded">
                                <p className="text-sm font-medium text-blue-900">{classInfo.course}</p>
                                <p className="text-xs text-blue-700">{classInfo.room}</p>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.course}</p>
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date} at {event.time}
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
