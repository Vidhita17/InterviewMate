import { useState } from "react";
import WelcomeBackModal from "../WelcomeBackModal";
import { Button } from "@/components/ui/button";

// todo: remove mock functionality
const mockSavedSession = {
  candidateName: "John Doe",
  questionsAnswered: 2,
  totalQuestions: 6,
  currentDifficulty: "Medium" as const,
  timeLeft: 45,
  lastSaved: new Date("2024-01-16T10:30:00")
};

export default function WelcomeBackModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleResume = () => {
    console.log("Resuming interview session");
    setIsOpen(false);
  };

  const handleStartNew = () => {
    console.log("Starting new interview session");
    setIsOpen(false);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <Button onClick={() => setIsOpen(true)}>
        Show Welcome Back Modal
      </Button>
      
      <WelcomeBackModal
        isOpen={isOpen}
        savedSession={mockSavedSession}
        onResume={handleResume}
        onStartNew={handleStartNew}
      />
    </div>
  );
}