import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, Mail, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface QuestionAnswer {
  questionNumber: number;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  answer: string;
  timeSpent: number;
  maxTime: number;
  score?: number;
}

interface CandidateDetailProps {
  candidate: {
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
  };
  questionAnswers: QuestionAnswer[];
  onBack: () => void;
}

export default function CandidateDetail({ candidate, questionAnswers, onBack }: CandidateDetailProps) {
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-chart-2";
    if (score >= 60) return "text-chart-3";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-chart-2" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-chart-3" />;
      case "paused":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onBack}
          data-testid="button-back-to-list"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Candidate Details</h2>
      </div>

      {/* Candidate Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg">
                {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span data-testid="text-candidate-detail-name">{candidate.name}</span>
                {getStatusIcon(candidate.status)}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {candidate.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {candidate.phone}
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {candidate.score ? (
                  <span className={getScoreColor(candidate.score)}>
                    {candidate.score}/100
                  </span>
                ) : (
                  <span className="text-muted-foreground">--</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">Final Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{candidate.questionsAnswered}/{candidate.totalQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{candidate.startedAt.toLocaleDateString()}</div>
              <div className="text-xs text-muted-foreground">Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {candidate.completedAt ? candidate.completedAt.toLocaleDateString() : "--"}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>

          {candidate.summary && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">AI Summary</h4>
              <p className="text-sm text-muted-foreground">{candidate.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Questions & Answers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interview Questions & Answers</h3>
        
        {questionAnswers.map((qa) => (
          <Card key={qa.questionNumber}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Q{qa.questionNumber}</Badge>
                  <Badge className={getDifficultyColor(qa.difficulty)}>
                    {qa.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTime(qa.timeSpent)} / {formatTime(qa.maxTime)}
                  </div>
                  {qa.score !== undefined && (
                    <div className={`font-medium ${getScoreColor(qa.score)}`}>
                      {qa.score}/20
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Question:</h5>
                <p className="text-sm text-muted-foreground">{qa.question}</p>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">Answer:</h5>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">{qa.answer || "[No answer provided]"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {questionAnswers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No questions answered yet.
          </div>
        )}
      </div>
    </div>
  );
}