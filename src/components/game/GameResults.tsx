"use client";

import React from "react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  name: string;
  score: number;
  answered: boolean;
}

interface GameResultsProps {
  players: Player[];
  onPlayAgain: () => void;
}

export default function GameResults({ players, onPlayAgain }: GameResultsProps) {
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
          <p className="text-gray-600">Here are the final results</p>
        </div>
        
        {/* Winner Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 text-center">
            <div className="text-yellow-600 text-sm font-medium mb-2">Winner</div>
            <div className="text-2xl font-bold text-yellow-800 mb-1">{winner.name}</div>
            <div className="inline-flex items-center gap-2 bg-yellow-200 px-3 py-1 rounded-full">
              <span className="text-yellow-700 font-medium">{winner.score}</span>
              <span className="text-yellow-600 text-sm">points</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Final Standings</h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-50 text-blue-700'}`}>
                    {index + 1}
                  </span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">{player.score}</span>
                  <span className="text-gray-500 text-sm">pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Play Again Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlayAgain}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
