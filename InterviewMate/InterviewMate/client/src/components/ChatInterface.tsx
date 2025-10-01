import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, CheckCircle2 } from "lucide-react";
import QuestionTimer from "./QuestionTimer";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  questionNumber?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
}

interface ChatInterfaceProps {
  questionNumber: number;
  totalQuestions: number;
  currentQuestion?: Message;
  onAnswerSubmit: (answer: string) => void;
  isTimerActive: boolean;
}

export default function ChatInterface({ 
  questionNumber, 
  totalQuestions, 
  currentQuestion,
  onAnswerSubmit,
  isTimerActive 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Welcome to your Full Stack Developer interview! I'll be asking you 6 questions in total - 2 Easy, 2 Medium, and 2 Hard. Let's begin with your first question:",
      timestamp: new Date(),
    },
    {
      id: "2", 
      type: "ai",
      content: "What is the difference between `let`, `const`, and `var` in JavaScript? Please explain their scope and hoisting behavior.",
      timestamp: new Date(),
      questionNumber: 1,
      difficulty: "Easy"
    }
  ]);
  
  const [currentAnswer, setCurrentAnswer] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    if (!currentAnswer.trim()) return;

    // Add user's answer to messages
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentAnswer,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    onAnswerSubmit(currentAnswer);
    setCurrentAnswer("");

    // Simulate AI generating next question
    setTimeout(() => {
      if (questionNumber < totalQuestions) {
        const questions = [
          "Explain the concept of React hooks and provide an example of how you would use useState and useEffect.",
          "How would you implement authentication in a Node.js Express application? Discuss different approaches.",
          "Design a database schema for a social media platform. Consider relationships, indexing, and scalability.",
          "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?",
          "How would you optimize a React application's performance? Discuss specific techniques and tools you would use."
        ];
        
        const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Medium", "Hard", "Hard"];
        
        const nextQuestion: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: questions[questionNumber - 1] || "Thank you for completing all questions! I'm now calculating your final score...",
          timestamp: new Date(),
          questionNumber: questionNumber + 1,
          difficulty: difficulties[questionNumber - 1]
        };
        
        setMessages(prev => [...prev, nextQuestion]);
      } else {
        // Interview completed
        const completionMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: "🎉 Congratulations! You've completed the interview. Your responses have been recorded and will be reviewed. You scored 85/100 - Excellent performance!",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, completionMessage]);
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    if (currentAnswer.trim()) {
      handleSubmit();
    } else {
      // Auto-submit empty answer
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "[No answer provided - time expired]",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      onAnswerSubmit("");
    }
  };

  const getCurrentDifficulty = (): "Easy" | "Medium" | "Hard" => {
    if (questionNumber <= 2) return "Easy";
    if (questionNumber <= 4) return "Medium";
    return "Hard";
  };

  const getTimerDuration = (): number => {
    const difficulty = getCurrentDifficulty();
    switch (difficulty) {
      case "Easy": return 20;
      case "Medium": return 60;
      case "Hard": return 120;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline">
              Question {questionNumber} of {totalQuestions}
            </Badge>
            <Badge className={`${
              getCurrentDifficulty() === "Easy" ? "bg-chart-2" :
              getCurrentDifficulty() === "Medium" ? "bg-chart-3" : "bg-destructive"
            }`}>
              {getCurrentDifficulty()}
            </Badge>
          </div>
          {questionNumber <= totalQuestions && (
            <div className="w-64">
              <QuestionTimer
                duration={getTimerDuration()}
                difficulty={getCurrentDifficulty()}
                onTimeUp={handleTimeUp}
                isActive={isTimerActive && questionNumber <= totalQuestions}
              />
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                message.type === "ai" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {message.type === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <Card className={`${message.type === "user" ? "bg-primary text-primary-foreground" : ""}`}>
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.questionNumber && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Q{message.questionNumber}
                      </Badge>
                      {message.difficulty && (
                        <Badge variant="outline" className="text-xs">
                          {message.difficulty}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {questionNumber <= totalQuestions && (
        <div className="border-t bg-card p-4">
          <div className="flex gap-2">
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              data-testid="textarea-answer"
            />
            <Button 
              onClick={handleSubmit}
              disabled={!currentAnswer.trim()}
              size="icon"
              className="self-end"
              data-testid="button-submit-answer"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to submit, Shift+Enter for new line
          </p>
        </div>
      )}
    </div>
  );
}