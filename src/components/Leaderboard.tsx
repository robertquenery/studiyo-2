"use client";

import React from "react";

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
}

const sampleLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Alice", points: 150 },
  { id: "2", name: "Bob", points: 120 },
  { id: "3", name: "Charlie", points: 100 },
];

export default function Leaderboard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ol className="list-decimal list-inside space-y-2">
        {sampleLeaderboard.map((entry) => (
          <li key={entry.id} className="flex justify-between border p-3 rounded hover:shadow-md transition">
            <span>{entry.name}</span>
            <span>{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
