import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Firebase config - import from src/lib/firebase.ts or copy config here
import { firebaseConfig } from "./src/lib/firebase";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Replace with your actual gameId
const gameId = "your-game-id";

// New questions data
const newQuestions = [
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

async function updateQuestions() {
  try {
    const gameRef = doc(db, "games", gameId);
    await updateDoc(gameRef, { questions: newQuestions });
    console.log("Questions updated successfully.");
  } catch (error) {
    console.error("Error updating questions:", error);
  }
}

updateQuestions();
