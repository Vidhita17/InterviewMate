import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";

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

interface CandidateListProps {
  candidates: Candidate[];
  onCandidateSelect: (candidate: Candidate) => void;
}

export default function CandidateList({ candidates, onCandidateSelect }: CandidateListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name" | "date">("score");

  const filteredAndSortedCandidates = candidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return (b.score || 0) - (a.score || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return b.startedAt.getTime() - a.startedAt.getTime();
        default:
          return 0;
      }
    });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-chart-2 text-white">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-chart-3 text-white">In Progress</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      default:
        return null;
    }
  };

  const getScoreBadge = (score?: number) => {
    if (score === undefined) return null;
    
    let variant = "secondary";
    let className = "";
    
    if (score >= 80) {
      className = "bg-chart-2 text-white";
    } else if (score >= 60) {
      className = "bg-chart-3 text-white";
    } else {
      className = "bg-destructive text-white";
    }
    
    return <Badge className={className}>{score}/100</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Candidates</h2>
          <p className="text-muted-foreground">
            {candidates.length} total candidates
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
              data-testid="input-search-candidates"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "score" | "name" | "date")}
            className="px-3 py-2 border rounded-md bg-background text-sm"
            data-testid="select-sort-candidates"
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-4">
        {filteredAndSortedCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover-elevate cursor-pointer" onClick={() => onCandidateSelect(candidate)}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold" data-testid={`text-candidate-name-${candidate.id}`}>
                        {candidate.name}
                      </h3>
                      {getStatusIcon(candidate.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{candidate.questionsAnswered}/{candidate.totalQuestions} questions</span>
                      <span>•</span>
                      <span>Started {candidate.startedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right space-y-2">
                    {getScoreBadge(candidate.score)}
                    {getStatusBadge(candidate.status)}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCandidateSelect(candidate);
                    }}
                    data-testid={`button-view-candidate-${candidate.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {candidate.summary && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    {candidate.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {filteredAndSortedCandidates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No candidates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}