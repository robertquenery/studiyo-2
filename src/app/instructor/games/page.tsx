"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc, query, orderBy, limit } from "firebase/firestore";
import { useAuth } from "@/contexts/auth-context";
import { BookOpen, Edit3, Trophy, Users, Play, Trash2, Plus, Save } from "lucide-react";

interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  timestamp: Date;
}

interface GameSession {
  id: string;
  status: "active" | "finished";
  players: {
    id: string;
    name: string;
    score: number;
    answered: boolean;
  }[];
  currentQuestionIndex: number;
  questions: Question[];
}

const sampleQuestions: Question[] = [
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

export default function InstructorGamesPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeGames, setActiveGames] = useState<GameSession[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    answers: [
      { id: "a1", text: "", isCorrect: false },
      { id: "a2", text: "", isCorrect: false },
      { id: "a3", text: "", isCorrect: false },
      { id: "a4", text: "", isCorrect: false },
    ]
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
        const snapshot = await getDocs(q);
        const leaderboardData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        } as LeaderboardEntry));
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion) return;

    try {
      // Update questions in state
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
      
      // In a real implementation, you would save to Firebase here
      console.log("Question saved:", editingQuestion);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      // Remove question from state
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(updatedQuestions);
      
      // In a real implementation, you would delete from Firebase here
      console.log("Question deleted:", questionId);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
    setNewQuestion({
      text: "",
      answers: [
        { id: "a1", text: "", isCorrect: false },
        { id: "a2", text: "", isCorrect: false },
        { id: "a3", text: "", isCorrect: false },
        { id: "a4", text: "", isCorrect: false },
      ]
    });
  };

  const handleSaveNewQuestion = async () => {
    try {
      // Create new question with unique ID
      const newQuestionObj: Question = {
        id: `q${questions.length + 1}`,
        text: newQuestion.text,
        answers: newQuestion.answers
      };
      
      // Add to questions state
      setQuestions([...questions, newQuestionObj]);
      setIsAddingQuestion(false);
      
      // Reset new question form
      setNewQuestion({
        text: "",
        answers: [
          { id: "a1", text: "", isCorrect: false },
          { id: "a2", text: "", isCorrect: false },
          { id: "a3", text: "", isCorrect: false },
          { id: "a4", text: "", isCorrect: false },
        ]
      });
      
      // In a real implementation, you would save to Firebase here
      console.log("New question added:", newQuestionObj);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleClearLeaderboard = async () => {
    try {
      // Clear leaderboard from Firebase
      const leaderboardSnapshot = await getDocs(collection(db, "leaderboard"));
      const batchPromises = leaderboardSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(batchPromises);
      
      // Clear local leaderboard state
      setLeaderboard([]);
      
      console.log("Leaderboard cleared");
    } catch (error) {
      console.error("Error clearing leaderboard:", error);
    }
  };

  const updateEditingQuestionText = (text: string) => {
    if (editingQuestion) {
      setEditingQuestion({ ...editingQuestion, text });
    }
  };

  const updateEditingQuestionAnswer = (index: number, text: string) => {
    if (editingQuestion) {
      const updatedAnswers = [...editingQuestion.answers];
      updatedAnswers[index] = { ...updatedAnswers[index], text };
      setEditingQuestion({ ...editingQuestion, answers: updatedAnswers });
    }
  };

  const setEditingQuestionCorrectAnswer = (index: number) => {
    if (editingQuestion) {
      const updatedAnswers = editingQuestion.answers.map((answer, i) => ({
        ...answer,
        isCorrect: i === index
      }));
      setEditingQuestion({ ...editingQuestion, answers: updatedAnswers });
    }
  };

  const updateNewQuestionText = (text: string) => {
    setNewQuestion({ ...newQuestion, text });
  };

  const updateNewQuestionAnswer = (index: number, text: string) => {
    const updatedAnswers = [...newQuestion.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], text };
    setNewQuestion({ ...newQuestion, answers: updatedAnswers });
  };

  const setNewQuestionCorrectAnswer = (index: number) => {
    const updatedAnswers = newQuestion.answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index
    }));
    setNewQuestion({ ...newQuestion, answers: updatedAnswers });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Game Management</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage quiz questions and view leaderboard statistics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Question Management */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Edit3 className="w-5 h-5" />
                Question Management
              </h2>
              <button
                onClick={handleAddQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>

            {isAddingQuestion && (
              <div className="mb-6 p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Add New Question</h3>
                <input
                  type="text"
                  value={newQuestion.text}
                  onChange={(e) => updateNewQuestionText(e.target.value)}
                  placeholder="Enter question text"
                  className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div className="space-y-2 mb-3">
                  {newQuestion.answers.map((answer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={answer.isCorrect}
                        onChange={() => setNewQuestionCorrectAnswer(index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => updateNewQuestionAnswer(index, e.target.value)}
                        placeholder={`Answer ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNewQuestion}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Question
                  </button>
                  <button
                    onClick={() => setIsAddingQuestion(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                  {editingQuestion?.id === question.id ? (
                    <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900">
                      <input
                        type="text"
                        value={editingQuestion.text}
                        onChange={(e) => updateEditingQuestionText(e.target.value)}
                        className="w-full p-3 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <div className="space-y-2 mb-3">
                        {editingQuestion.answers.map((answer, answerIndex) => (
                          <div key={answerIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={answer.isCorrect}
                              onChange={() => setEditingQuestionCorrectAnswer(answerIndex)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <input
                              type="text"
                              value={answer.text}
                              onChange={(e) => updateEditingQuestionAnswer(answerIndex, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveQuestion}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingQuestion(null)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {index + 1}. {question.text}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full"
                            title="Edit Question"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-full"
                            title="Delete Question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                        {question.answers.map((answer, answerIndex) => (
                          <div 
                            key={answerIndex} 
                            className={`p-3 rounded-lg ${
                              answer.isCorrect 
                                ? "bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700" 
                                : "bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                                answer.isCorrect 
                                  ? "bg-green-500 text-white" 
                                  : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                              }`}>
                                {answer.isCorrect ? "✓" : String.fromCharCode(65 + answerIndex)}
                              </span>
                              <span className="text-gray-900 dark:text-gray-100">{answer.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Trophy className="w-5 h-5" />
                Leaderboard
              </h2>
              <button
                onClick={handleClearLeaderboard}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-3">
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
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
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                  No leaderboard entries yet
                </p>
              )}
            </div>
          </div>

          {/* Active Games */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Users className="w-5 h-5" />
              Active Games
            </h2>
            <div className="space-y-3">
              {activeGames.length > 0 ? (
                activeGames.map((game) => (
                  <div key={game.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">Game #{game.id.slice(0, 6)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        game.status === "active" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                          : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                      }`}>
                        {game.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {game.players.length} players • Q{game.currentQuestionIndex + 1}
                    </div>
                    <button className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Play className="w-4 h-4" />
                      View Game
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                  No active games currently
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
