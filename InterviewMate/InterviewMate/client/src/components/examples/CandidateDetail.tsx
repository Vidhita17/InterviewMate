import CandidateDetail from "../CandidateDetail";

// todo: remove mock functionality
const mockCandidate = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1-555-0123",
  score: 85,
  status: "completed" as const,
  questionsAnswered: 6,
  totalQuestions: 6,
  startedAt: new Date("2024-01-15T10:30:00"),
  completedAt: new Date("2024-01-15T11:15:00"),
  summary: "Strong full-stack developer with excellent React and Node.js knowledge. Good problem-solving skills and clear communication. Demonstrated solid understanding of fundamental concepts and was able to tackle advanced problems effectively."
};

const mockQuestionAnswers = [
  {
    questionNumber: 1,
    difficulty: "Easy" as const,
    question: "What is the difference between `let`, `const`, and `var` in JavaScript? Please explain their scope and hoisting behavior.",
    answer: "`var` is function-scoped and hoisted, `let` and `const` are block-scoped. `const` cannot be reassigned after declaration, while `let` can be. All are hoisted but `let` and `const` have temporal dead zone.",
    timeSpent: 18,
    maxTime: 20,
    score: 18
  },
  {
    questionNumber: 2,
    difficulty: "Easy" as const,
    question: "Explain the concept of React hooks and provide an example of how you would use useState and useEffect.",
    answer: "Hooks allow functional components to use state and lifecycle methods. useState manages state, useEffect handles side effects. Example: const [count, setCount] = useState(0); useEffect(() => { document.title = count; }, [count]);",
    timeSpent: 19,
    maxTime: 20,
    score: 17
  },
  {
    questionNumber: 3,
    difficulty: "Medium" as const,
    question: "How would you implement authentication in a Node.js Express application? Discuss different approaches.",
    answer: "I would use JWT tokens for stateless auth. Implement login endpoint that validates credentials and returns JWT. Use middleware to verify tokens on protected routes. Could also use session-based auth with express-session for traditional apps.",
    timeSpent: 55,
    maxTime: 60,
    score: 16
  },
  {
    questionNumber: 4,
    difficulty: "Medium" as const,
    question: "Design a database schema for a social media platform. Consider relationships, indexing, and scalability.",
    answer: "Users table with posts, comments, likes tables. Foreign keys for relationships. Index on user_id, post_id, created_at. Consider partitioning for large datasets and denormalization for read performance.",
    timeSpent: 58,
    maxTime: 60,
    score: 15
  },
  {
    questionNumber: 5,
    difficulty: "Hard" as const,
    question: "Explain how you would optimize a React application's performance. Discuss specific techniques and tools.",
    answer: "Use React.memo for component memoization, useMemo/useCallback for expensive calculations. Code splitting with lazy loading. Optimize bundle size with tree shaking. Use React DevTools profiler to identify performance bottlenecks.",
    timeSpent: 110,
    maxTime: 120,
    score: 19
  },
  {
    questionNumber: 6,
    difficulty: "Hard" as const,
    question: "How would you handle real-time features in a web application? Discuss WebSockets vs Server-Sent Events.",
    answer: "WebSockets for bidirectional communication like chat. SSE for unidirectional updates like notifications. Consider scaling with message queues like Redis. WebSocket libraries like Socket.io provide fallbacks and room management.",
    timeSpent: 105,
    maxTime: 120,
    score: 16
  }
];

export default function CandidateDetailExample() {
  const handleBack = () => {
    console.log("Going back to candidate list");
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <CandidateDetail
        candidate={mockCandidate}
        questionAnswers={mockQuestionAnswers}
        onBack={handleBack}
      />
    </div>
  );
}