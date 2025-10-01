import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";

interface QuestionTimerProps {
  duration: number; // in seconds
  difficulty: "Easy" | "Medium" | "Hard";
  onTimeUp: () => void;
  isActive: boolean;
}

export default function QuestionTimer({ duration, difficulty, onTimeUp, isActive }: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTimeLeft(duration);
    setProgress(100);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        const newTime = prev - 1;
        setProgress((newTime / duration) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (progress > 50) return "text-chart-2";
    if (progress > 20) return "text-chart-3";
    return "text-destructive";
  };

  const getProgressColor = () => {
    if (progress > 50) return "bg-chart-2";
    if (progress > 20) return "bg-chart-3";
    return "bg-destructive";
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy": return "text-chart-2 bg-chart-2/10";
      case "Medium": return "text-chart-3 bg-chart-3/10";
      case "Hard": return "text-destructive bg-destructive/10";
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Time Remaining</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {difficulty}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className={`text-2xl font-bold ${getTimerColor()}`} data-testid="timer-display">
            {formatTime(timeLeft)}
          </div>
          
          <div className="relative">
            <Progress value={progress} className="h-2" />
            <div 
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {progress <= 20 && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>Time running out!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}