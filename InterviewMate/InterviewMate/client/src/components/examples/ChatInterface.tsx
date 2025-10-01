import { useState } from "react";
import ChatInterface from "../ChatInterface";

export default function ChatInterfaceExample() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleAnswerSubmit = (answer: string) => {
    console.log("Answer submitted:", answer);
    setQuestionNumber(prev => prev + 1);
  };

  return (
    <div className="h-screen bg-background">
      <ChatInterface
        questionNumber={questionNumber}
        totalQuestions={6}
        onAnswerSubmit={handleAnswerSubmit}
        isTimerActive={isTimerActive}
      />
    </div>
  );
}