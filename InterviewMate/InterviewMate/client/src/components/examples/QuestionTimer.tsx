import { useState } from "react";
import QuestionTimer from "../QuestionTimer";
import { Button } from "@/components/ui/button";

export default function QuestionTimerExample() {
  const [isActive, setIsActive] = useState(false);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  const handleTimeUp = () => {
    console.log("Time's up!");
    setIsActive(false);
  };

  const durations = {
    Easy: 20,
    Medium: 60,
    Hard: 120
  };

  return (
    <div className="p-8 bg-background space-y-4 max-w-md mx-auto">
      <QuestionTimer 
        duration={durations[difficulty]}
        difficulty={difficulty}
        onTimeUp={handleTimeUp}
        isActive={isActive}
      />
      
      <div className="flex gap-2">
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"];
            const current = difficulties.indexOf(difficulty);
            const next = (current + 1) % difficulties.length;
            setDifficulty(difficulties[next]);
            setIsActive(false);
          }}
        >
          Switch: {difficulty}
        </Button>
      </div>
    </div>
  );
}