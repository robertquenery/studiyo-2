"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, query, orderBy, limit, getDoc } from "firebase/firestore";
import { QuizGame } from "./game/QuizGame";
import GameResults from "./game/GameResults";
import { useAuth } from "@/contexts/auth-context";

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

interface GameSession {
  id: string;
  status: "active" | "finished";
  players: Player[];
  currentQuestionIndex: number;
  questions: typeof sampleQuestions;
}

const sampleQuestions = [
  {
    id: "q1",
    text: "What is the main purpose of Agile Project Management?",
    answers: [
      { id: "q1a", text: "To complete projects with no customer input", isCorrect: false },
      { id: "q1b", text: "To follow a strict plan from start to finish", isCorrect: false },
      { id: "q1c", text: "To deliver small, working pieces of a product quickly and often", isCorrect: true },
      { id: "q1d", text: "To avoid changes during the project", isCorrect: false },
    ],
  },
  {
    id: "q2",
    text: "Which of the following is a core value of Agile?",
    answers: [
      { id: "q2a", text: "Contracts over collaboration", isCorrect: false },
      { id: "q2b", text: "Detailed planning over flexibility", isCorrect: false },
      { id: "q2c", text: "Individuals and interactions over processes and tools", isCorrect: true },
      { id: "q2d", text: "Strict deadlines over customer satisfaction", isCorrect: false },
    ],
  },
  {
    id: "q3",
    text: "What does “iterative development” mean in Agile?",
    answers: [
      { id: "q3a", text: "Building everything at once", isCorrect: false },
      { id: "q3b", text: "Skipping testing phases", isCorrect: false },
      { id: "q3c", text: "Delivering work in repeated cycles with feedback", isCorrect: true },
      { id: "q3d", text: "Outsourcing tasks to save time", isCorrect: false },
    ],
  },
  {
    id: "q4",
    text: "In Scrum, who removes obstacles so the team can work smoothly?",
    answers: [
      { id: "q4a", text: "Product Owner", isCorrect: false },
      { id: "q4b", text: "Scrum Master", isCorrect: true },
      { id: "q4c", text: "Stakeholder", isCorrect: false },
      { id: "q4d", text: "Team Lead", isCorrect: false },
    ],
  },
  {
    id: "q5",
    text: "What is the role of the Product Owner in Agile?",
    answers: [
      { id: "q5a", text: "Write all the code", isCorrect: false },
      { id: "q5b", text: "Manage the team’s vacations", isCorrect: false },
      { id: "q5c", text: "Prioritize the product backlog and represent the customer", isCorrect: true },
      { id: "q5d", text: "Approve salaries", isCorrect: false },
    ],
  },
  {
    id: "q6",
    text: "Which document lists and prioritizes features or tasks in Agile?",
    answers: [
      { id: "q6a", text: "Business Case", isCorrect: false },
      { id: "q6b", text: "Risk Register", isCorrect: false },
      { id: "q6c", text: "Product Backlog", isCorrect: true },
      { id: "q6d", text: "Sprint Burndown", isCorrect: false },
    ],
  },
  {
    id: "q7",
    text: "What is the typical timebox for a Scrum sprint?",
    answers: [
      { id: "q7a", text: "1 day", isCorrect: false },
      { id: "q7b", text: "2–4 weeks", isCorrect: true },
      { id: "q7c", text: "6 months", isCorrect: false },
      { id: "q7d", text: "Until the project is done", isCorrect: false },
    ],
  },
  {
    id: "q8",
    text: "Why do Agile teams hold sprint retrospectives?",
    answers: [
      { id: "q8a", text: "To reward top-performing developers", isCorrect: false },
      { id: "q8b", text: "To discuss progress with investors", isCorrect: false },
      { id: "q8c", text: "To improve how the team works in the next sprint", isCorrect: true },
      { id: "q8d", text: "To plan marketing strategies", isCorrect: false },
    ],
  },
  {
    id: "q9",
    text: "What does a \"burn-down chart\" show?",
    answers: [
      { id: "q9a", text: "How much budget is left", isCorrect: false },
      { id: "q9b", text: "Number of bugs found", isCorrect: false },
      { id: "q9c", text: "Work remaining in a sprint", isCorrect: true },
      { id: "q9d", text: "Hours worked by each team member", isCorrect: false },
    ],
  },
  {
    id: "q10",
    text: "Which statement best describes Agile teams?",
    answers: [
      { id: "q10a", text: "Teams work separately and only report to the manager", isCorrect: false },
      { id: "q10b", text: "Teams follow strict roles and never collaborate", isCorrect: false },
      { id: "q10c", text: "Teams are cross-functional and self-organizing", isCorrect: true },
      { id: "q10d", text: "Teams wait for instructions from the Product Owner before starting anything", isCorrect: false },
    ],
  },
];

export default function Games() {
  const [currentGame, setCurrentGame] = useState<GameSession | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
const [leaderboard, setLeaderboard] = useState<Player[]>([]);

const [fullName, setFullName] = useState<string | null>(null);

const { user } = useAuth();

// Fetch full user profile to get fullName
useEffect(() => {
  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullName(userData.fullName || null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  fetchUserProfile();
}, [user]);

// Subscribe to leaderboard updates
useEffect(() => {
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const leaderboardData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Player));
    // Replace any "You" names with actual user fullName
    const updatedLeaderboard = leaderboardData.map(player => {
      if (player.name === "You" && fullName) {
        return { ...player, name: fullName };
      }
      return player;
    });
    setLeaderboard(updatedLeaderboard);
  });

  return () => unsubscribe();
}, [fullName]);

const startNewGame = async () => {
  try {
    if (!fullName) {
      throw new Error("User full name is required to start a game.");
    }
    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
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
  }, [currentGame?.id, currentGame]);

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
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Educational Games</h1>
        <p className="text-gray-600 dark:text-gray-300">Challenge your knowledge and compete with friends!</p>
      </div>

      {!currentGame && !gameEnded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Start Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Play</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Test your knowledge with 10 challenging questions. Answer quickly for higher points!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Time per Question</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">20s</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Max Points per Question</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1000</div>
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-50 text-blue-700'}`}>
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{player.name}</span>
                    </div>
                    <div className="font-semibold text-blue-600 dark:text-blue-400">{player.score} pts</div>
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
    players={currentGame.players.map(player => ({
      ...player,
      name: player.id === players[0]?.id ? players[0]?.name : player.name
    }))}
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
