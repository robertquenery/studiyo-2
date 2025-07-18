"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import QuestionCard from "./QuestionCard";

interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface GameState {
  id: string;
  currentQuestionIndex: number;
  players: {
    id: string;
    name: string;
    score: number;
    answered: boolean;
  }[];
  status: "waiting" | "active" | "finished";
  questions: Question[];
}

const QUESTION_TIME = 20; // seconds per question
const MAX_POINTS = 1000; // maximum points per question

interface QuizGameProps {
  gameId: string;
  playerId: string;
  playerName: string;
  onGameEnd: () => void;
  onScoreUpdate?: (player: { id: string; name: string; score: number }) => void;
}

export function QuizGame({ gameId, playerId, playerName, onGameEnd, onScoreUpdate }: QuizGameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
const [timeLeft] = useState(QUESTION_TIME);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  // Subscribe to game state changes
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", gameId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGameState(data as GameState);
        if (data.questions) {
          setQuestions(data.questions);
          if (data.currentQuestionIndex < data.questions.length) {
            setCurrentQuestion(data.questions[data.currentQuestionIndex]);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  const handleAnswer = useCallback(async (answerId: string) => {
    if (!gameState || !currentQuestion) return;

    const isCorrect = currentQuestion.answers.find(a => a.id === answerId)?.isCorrect || false;
    
    // Calculate points based on speed (time remaining)
    let pointsEarned = 0;
    if (isCorrect) {
      // Points = (time remaining / total time) * max points
      // Minimum 100 points for correct answer, maximum 1000 points
      const timeRatio = timeLeft / QUESTION_TIME;
      pointsEarned = Math.max(100, Math.floor(timeRatio * MAX_POINTS));
    }
    
    // Update player's answered status and score in game state
    const gameRef = doc(db, "games", gameId);
    const currentPlayer = gameState.players.find(p => p.id === playerId);
    if (!currentPlayer) return;

    const updatedPlayers = gameState.players.map(player => 
      player.id === playerId
        ? { 
            ...player,
            score: player.score + pointsEarned, // Add calculated points
            answered: true 
          }
        : player
    );

    // Update local state first
    const updatedState = {
      ...gameState,
      players: updatedPlayers
    };
    setGameState(updatedState);

    // Then update Firestore
    await updateDoc(gameRef, {
      players: updatedPlayers
    });

    // Advance to next question if all players answered
    const allAnswered = updatedPlayers.every(p => p.answered);
    if (allAnswered) {
      const nextIndex = gameState.currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        await updateDoc(gameRef, {
          currentQuestionIndex: nextIndex,
          players: updatedPlayers.map(p => ({ ...p, answered: false })),
        });
      } else {
        // End game
        const finalScore = updatedState.players.find(p => p.id === playerId)?.score || 0;
        
        await updateDoc(gameRef, { 
          status: "finished",
          players: updatedState.players
        });
        
        // Update leaderboard with final score
        if (onScoreUpdate) {
          onScoreUpdate({
            id: playerId,
            name: playerName,
            score: finalScore
          });
        }
        onGameEnd();
      }
    }
  }, [currentQuestion, gameState, playerId, playerName, questions, timeLeft, onScoreUpdate, onGameEnd, gameId]);
  
  if (!gameState || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Question {gameState.currentQuestionIndex + 1}/{questions.length}</h3>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Score</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {gameState.players.find(p => p.id === playerId)?.score || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuestionCard
        question={currentQuestion.text}
        answers={currentQuestion.answers}
        timeLeft={timeLeft}
        onAnswerSelect={handleAnswer}
        isAnswered={gameState.players.find(p => p.id === playerId)?.answered || false}
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Players</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className={`p-4 rounded-lg ${
                player.answered 
                  ? "bg-green-50 dark:bg-green-900 border border-green-100 dark:border-green-700" 
                  : "bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-700"
              }`}
            >
              <div className="font-medium mb-1 text-gray-900 dark:text-gray-100">{player.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Score: {player.score}</div>
              {player.answered && (
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">Answered</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
