"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import QuizGame from "./game/QuizGame";
import GameResults from "./game/GameResults";

interface Player {
  id: string;
  name: string;
  score: number;
  answered: boolean;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

const sampleQuestions = [
  {
    id: "q1",
    text: "What is the capital of France?",
    answers: [
      { id: "a1", text: "London", isCorrect: false },
      { id: "a2", text: "Paris", isCorrect: true },
      { id: "a3", text: "Berlin", isCorrect: false },
      { id: "a4", text: "Madrid", isCorrect: false },
    ],
  },
  {
    id: "q2",
    text: "Which planet is known as the Red Planet?",
    answers: [
      { id: "a1", text: "Venus", isCorrect: false },
      { id: "a2", text: "Jupiter", isCorrect: false },
      { id: "a3", text: "Mars", isCorrect: true },
      { id: "a4", text: "Saturn", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "What is the largest ocean on Earth?",
    answers: [
      { id: "a1", text: "Atlantic Ocean", isCorrect: false },
      { id: "a2", text: "Indian Ocean", isCorrect: false },
      { id: "a3", text: "Arctic Ocean", isCorrect: false },
      { id: "a4", text: "Pacific Ocean", isCorrect: true },
    ],
  },
  {
    id: "q4",
    text: "Who painted the Mona Lisa?",
    answers: [
      { id: "a1", text: "Vincent van Gogh", isCorrect: false },
      { id: "a2", text: "Leonardo da Vinci", isCorrect: true },
      { id: "a3", text: "Pablo Picasso", isCorrect: false },
      { id: "a4", text: "Michelangelo", isCorrect: false },
    ],
  },
  {
    id: "q5",
    text: "What is the chemical symbol for gold?",
    answers: [
      { id: "a1", text: "Go", isCorrect: false },
      { id: "a2", text: "Gd", isCorrect: false },
      { id: "a3", text: "Au", isCorrect: true },
      { id: "a4", text: "Ag", isCorrect: false },
    ],
  },
  {
    id: "q6",
    text: "Which country is home to Machu Picchu?",
    answers: [
      { id: "a1", text: "Brazil", isCorrect: false },
      { id: "a2", text: "Peru", isCorrect: true },
      { id: "a3", text: "Chile", isCorrect: false },
      { id: "a4", text: "Ecuador", isCorrect: false },
    ],
  },
  {
    id: "q7",
    text: "What is the smallest prime number?",
    answers: [
      { id: "a1", text: "1", isCorrect: false },
      { id: "a2", text: "2", isCorrect: true },
      { id: "a3", text: "3", isCorrect: false },
      { id: "a4", text: "0", isCorrect: false },
    ],
  },
  {
    id: "q8",
    text: "Which gas makes up about 78% of Earth's atmosphere?",
    answers: [
      { id: "a1", text: "Oxygen", isCorrect: false },
      { id: "a2", text: "Carbon Dioxide", isCorrect: false },
      { id: "a3", text: "Nitrogen", isCorrect: true },
      { id: "a4", text: "Hydrogen", isCorrect: false },
    ],
  },
  {
    id: "q9",
    text: "In which year did World War II end?",
    answers: [
      { id: "a1", text: "1944", isCorrect: false },
      { id: "a2", text: "1945", isCorrect: true },
      { id: "a3", text: "1946", isCorrect: false },
      { id: "a4", text: "1943", isCorrect: false },
    ],
  },
  {
    id: "q10",
    text: "What is the hardest natural substance on Earth?",
    answers: [
      { id: "a1", text: "Gold", isCorrect: false },
      { id: "a2", text: "Iron", isCorrect: false },
      { id: "a3", text: "Diamond", isCorrect: true },
      { id: "a4", text: "Quartz", isCorrect: false },
    ],
  },
];

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameSession | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);

  // Subscribe to leaderboard updates
  useEffect(() => {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leaderboardData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Player));
      setLeaderboard(leaderboardData);
    });

    return () => unsubscribe();
  }, []);

  const startNewGame = async () => {
    try {
      // Create a new game session
      const newPlayer: Player = {
        id: Math.random().toString(36).substr(2, 9),
        name: "You",
        score: 0,
        answered: false
      };

      const gameData: Omit<GameSession, "id"> = {
        status: "active",
        players: [newPlayer],
        currentQuestionIndex: 0,
        questions: sampleQuestions,
      };

      const gameRef = await addDoc(collection(db, "games"), gameData);

      setCurrentGame({
        id: gameRef.id,
        ...gameData
      } as GameSession);
      setPlayers([newPlayer]);
      setGameEnded(false);
    } catch (error) {
      console.error("Error starting new game:", error);
    }
  };

  // Subscribe to game updates
  useEffect(() => {
    if (!currentGame) return;

    const unsubscribe = onSnapshot(doc(db, "games", currentGame.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setCurrentGame({
          id: currentGame.id,
          status: data.status,
          players: data.players,
          currentQuestionIndex: data.currentQuestionIndex,
          questions: data.questions
        } as GameSession);
      }
    });

    return () => unsubscribe();
  }, [currentGame?.id]);

  const updateLeaderboard = async (player: LeaderboardEntry) => {
    try {
      const leaderboardRef = collection(db, "leaderboard");
      await addDoc(leaderboardRef, {
        name: player.name,
        score: player.score,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  const handleGameEnd = async () => {
    if (!currentGame) return;

    try {
      // Update game status
      const gameRef = doc(db, "games", currentGame.id);
      await updateDoc(gameRef, { status: "finished" });

      // The final scores are already in the players array
      // Just update the UI to show the game over screen
      setGameEnded(true);
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Educational Games</h1>
        <p className="text-gray-600">Challenge your knowledge and compete with friends!</p>
      </div>

      {!currentGame && !gameEnded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Start Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Play</h2>
              <p className="text-gray-600 mb-6">Test your knowledge with 10 challenging questions. Answer quickly for higher points!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Time per Question</div>
                  <div className="text-2xl font-bold">20s</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Max Points per Question</div>
                  <div className="text-2xl font-bold">1000</div>
                </div>
              </div>
              <button
                onClick={startNewGame}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Start New Game
              </button>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
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
                    <div className="font-semibold text-blue-600">{player.score} pts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentGame && !gameEnded && (
        <QuizGame
          gameId={currentGame.id}
          playerId={players[0]?.id || ""}
          playerName={players[0]?.name || ""}
          onGameEnd={handleGameEnd}
          onScoreUpdate={(player) => updateLeaderboard({
            id: player.id,
            name: player.name,
            score: player.score
          })}
        />
      )}

      {gameEnded && currentGame && (
        <GameResults
          players={currentGame.players}
          onPlayAgain={() => {
            setCurrentGame(null);
            setGameEnded(false);
            setPlayers([]); // Reset players for new game
          }}
        />
      )}
    </div>
  );
}
