import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

import TabNavigation from "./components/TabNavigation";
import ResumeUpload from "./components/ResumeUpload";
import ChatInterface from "./components/ChatInterface";
import CandidateList from "./components/CandidateList";
import CandidateDetail from "./components/CandidateDetail";
import WelcomeBackModal from "./components/WelcomeBackModal";

// Types
interface ExtractedData {
  name?: string;
  email?: string;
  phone?: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score?: number;
  status: "in-progress" | "completed" | "paused";
  questionsAnswered: number;
  totalQuestions: number;
  startedAt: Date;
  completedAt?: Date;
  summary?: string;
}

interface QuestionAnswer {
  questionNumber: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  answer: string;
  timeSpent: number;
  maxTime: number;
  score?: number;
}

// Mock data - todo: remove mock functionality
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1-555-0124",
    score: 92,
    status: "completed",
    questionsAnswered: 6,
    totalQuestions: 6,
    startedAt: new Date("2024-01-14T14:20:00"),
    completedAt: new Date("2024-01-14T15:05:00"),
    summary: "Exceptional candidate with deep understanding of modern web development. Outstanding performance on advanced questions."
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1-555-0125",
    status: "in-progress",
    questionsAnswered: 3,
    totalQuestions: 6,
    startedAt: new Date("2024-01-16T09:15:00"),
  }
];

const mockQuestionAnswers: QuestionAnswer[] = [
  {
    questionNumber: 1,
    difficulty: "Easy",
    question: "What is the difference between `let`, `const`, and `var` in JavaScript?",
    answer: "`var` is function-scoped and hoisted, `let` and `const` are block-scoped. `const` cannot be reassigned.",
    timeSpent: 18,
    maxTime: 20,
    score: 18
  },
  {
    questionNumber: 2,
    difficulty: "Easy", 
    question: "Explain React hooks and provide an example of useState and useEffect.",
    answer: "Hooks allow functional components to use state and lifecycle methods. useState manages state, useEffect handles side effects.",
    timeSpent: 19,
    maxTime: 20,
    score: 17
  }
];

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

function App() {
  // App state
  const [activeTab, setActiveTab] = useState<"interviewee" | "interviewer">("interviewee");
  const [intervieweeStep, setIntervieweeStep] = useState<"upload" | "chat" | "completed">("upload");
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  
  // Interview state
  const [candidateData, setCandidateData] = useState<ExtractedData>({});
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Check for saved session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("interviewSession");
    if (savedSession && activeTab === "interviewee") {
      const session = JSON.parse(savedSession);
      if (session.questionsAnswered < 6) {
        setShowWelcomeBack(true);
      }
    }
  }, [activeTab]);

  const handleDataExtracted = (data: ExtractedData) => {
    setCandidateData(data);
  };

  const handleUploadComplete = () => {
    setIntervieweeStep("chat");
    setIsTimerActive(true);
    // Save session
    const session = {
      candidateName: candidateData.name,
      questionsAnswered: 0,
      totalQuestions: 6,
      currentDifficulty: "Easy",
      timeLeft: 20,
      lastSaved: new Date()
    };
    localStorage.setItem("interviewSession", JSON.stringify(session));
  };

  const handleAnswerSubmit = (answer: string) => {
    console.log("Answer submitted:", answer);
    setQuestionNumber(prev => {
      const newNumber = prev + 1;
      if (newNumber > 6) {
        setIntervieweeStep("completed");
        setIsTimerActive(false);
        localStorage.removeItem("interviewSession");
      } else {
        // Update saved session
        const session = {
          candidateName: candidateData.name,
          questionsAnswered: newNumber - 1,
          totalQuestions: 6,
          currentDifficulty: newNumber <= 2 ? "Easy" : newNumber <= 4 ? "Medium" : "Hard",
          timeLeft: newNumber <= 2 ? 20 : newNumber <= 4 ? 60 : 120,
          lastSaved: new Date()
        };
        localStorage.setItem("interviewSession", JSON.stringify(session));
      }
      return newNumber;
    });
  };

  const handleResumeSession = () => {
    const savedSession = localStorage.getItem("interviewSession");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setCandidateData({ name: session.candidateName });
      setQuestionNumber(session.questionsAnswered + 1);
      setIntervieweeStep("chat");
      setIsTimerActive(true);
    }
    setShowWelcomeBack(false);
  };

  const handleStartNewSession = () => {
    localStorage.removeItem("interviewSession");
    setIntervieweeStep("upload");
    setQuestionNumber(1);
    setIsTimerActive(false);
    setCandidateData({});
    setShowWelcomeBack(false);
  };

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackToList = () => {
    setSelectedCandidate(null);
  };

  const getSavedSession = () => {
    const savedSession = localStorage.getItem("interviewSession");
    if (savedSession) {
      return JSON.parse(savedSession);
    }
    return null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-2xl font-bold">AI Interview Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  Full Stack Developer Interview Platform
                </p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          {/* Tab Navigation */}
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            candidateCount={candidates.length}
          />

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === "interviewee" && (
              <div className="h-[calc(100vh-8rem)]">
                {intervieweeStep === "upload" && (
                  <div className="flex items-center justify-center h-full p-8">
                    <ResumeUpload
                      onDataExtracted={handleDataExtracted}
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>
                )}
                
                {intervieweeStep === "chat" && (
                  <ChatInterface
                    questionNumber={questionNumber}
                    totalQuestions={6}
                    onAnswerSubmit={handleAnswerSubmit}
                    isTimerActive={isTimerActive}
                  />
                )}
                
                {intervieweeStep === "completed" && (
                  <div className="flex items-center justify-center h-full p-8 text-center">
                    <div className="space-y-4">
                      <div className="text-6xl">🎉</div>
                      <h2 className="text-2xl font-bold">Interview Completed!</h2>
                      <p className="text-muted-foreground max-w-md">
                        Thank you for completing the interview. Your responses have been recorded 
                        and will be reviewed by our team. You'll hear back from us soon!
                      </p>
                      <Button 
                        onClick={() => {
                          setIntervieweeStep("upload");
                          setQuestionNumber(1);
                          setCandidateData({});
                        }}
                        data-testid="button-start-new-interview"
                      >
                        Start New Interview
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "interviewer" && (
              <div className="p-8">
                {!selectedCandidate ? (
                  <CandidateList 
                    candidates={candidates}
                    onCandidateSelect={handleCandidateSelect}
                  />
                ) : (
                  <CandidateDetail
                    candidate={selectedCandidate}
                    questionAnswers={mockQuestionAnswers}
                    onBack={handleBackToList}
                  />
                )}
              </div>
            )}
          </main>
        </div>

        {/* Welcome Back Modal */}
        <WelcomeBackModal
          isOpen={showWelcomeBack}
          savedSession={getSavedSession()}
          onResume={handleResumeSession}
          onStartNew={handleStartNewSession}
        />

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;