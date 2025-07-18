"use client";

import React from "react";

export default function InstructorCalendarPage() {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  const schedule = [
    {
      day: "Monday",
      classes: [
        { time: "10:00 AM", course: "Agile Project Management - Cohort A", room: "Room 302" },
        { time: "2:00 PM", course: "Agile Project Management - Cohort B", room: "Room 303" }
      ]
    },
    {
      day: "Tuesday",
      classes: []
    },
    {
      day: "Wednesday",
      classes: [
        { time: "10:00 AM", course: "Agile Project Management - Cohort A", room: "Room 302" },
        { time: "2:00 PM", course: "Agile Project Management - Cohort B", room: "Room 303" }
      ]
    },
    {
      day: "Thursday",
      classes: []
    },
    {
      day: "Friday",
      classes: []
    }
  ];

  const upcomingEvents = [
    {
      title: "Sprint Planning Session - Cohort A",
      course: "Agile Project Management",
      date: "March 21, 2024",
      time: "2:00 PM"
    },
    {
      title: "Sprint Planning Session - Cohort B",
      course: "Agile Project Management",
      date: "March 22, 2024",
      time: "2:00 PM"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Schedule</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your classes and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              Weekly Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    {weekDays.map((day) => (
                      <th key={day} className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
                        {time}
                      </td>
                      {weekDays.map((day) => {
                        const classInfo = schedule.find(s => s.day === day)?.classes.find(c => c.time === time);
                        return (
                          <td key={`${day}-${time}`} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            {classInfo && (
                              <div className="bg-blue-50 dark:bg-blue-900 p-2 rounded">
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">{classInfo.course}</p>
                                <p className="text-xs text-blue-700 dark:text-blue-400">{classInfo.room}</p>
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.course}</p>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
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
