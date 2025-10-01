import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, FileText } from "lucide-react";

interface SavedSession {
  candidateName: string;
  questionsAnswered: number;
  totalQuestions: number;
  currentDifficulty: "Easy" | "Medium" | "Hard";
  timeLeft: number;
  lastSaved: Date;
}

interface WelcomeBackModalProps {
  isOpen: boolean;
  savedSession: SavedSession | null;
  onResume: () => void;
  onStartNew: () => void;
}

export default function WelcomeBackModal({ isOpen, savedSession, onResume, onStartNew }: WelcomeBackModalProps) {
  if (!savedSession) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-chart-2 text-white";
      case "Medium": return "bg-chart-3 text-white";
      case "Hard": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Welcome Back!
          </DialogTitle>
          <DialogDescription>
            We found an unfinished interview session. Would you like to resume where you left off?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{savedSession.candidateName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Question {savedSession.questionsAnswered + 1} of {savedSession.totalQuestions}
              </span>
              <Badge className={getDifficultyColor(savedSession.currentDifficulty)}>
                {savedSession.currentDifficulty}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {formatTime(savedSession.timeLeft)} remaining on current question
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Last saved: {savedSession.lastSaved.toLocaleString()}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={onStartNew}
            className="w-full sm:w-auto"
            data-testid="button-start-new-session"
          >
            Start New Interview
          </Button>
          <Button 
            onClick={onResume}
            className="w-full sm:w-auto"
            data-testid="button-resume-session"
          >
            Resume Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}