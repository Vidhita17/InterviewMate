import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare } from "lucide-react";

interface TabNavigationProps {
  activeTab: "interviewee" | "interviewer";
  onTabChange: (tab: "interviewee" | "interviewer") => void;
  candidateCount?: number;
}

export default function TabNavigation({ activeTab, onTabChange, candidateCount = 0 }: TabNavigationProps) {
  return (
    <div className="border-b bg-card">
      <div className="flex h-16 items-center justify-center space-x-2 px-4">
        <Button
          variant={activeTab === "interviewee" ? "default" : "ghost"}
          size="default"
          onClick={() => onTabChange("interviewee")}
          className="flex items-center gap-2"
          data-testid="tab-interviewee"
        >
          <MessageSquare className="h-4 w-4" />
          Interviewee
        </Button>
        <Button
          variant={activeTab === "interviewer" ? "default" : "ghost"}
          size="default"
          onClick={() => onTabChange("interviewer")}
          className="flex items-center gap-2"
          data-testid="tab-interviewer"
        >
          <Users className="h-4 w-4" />
          Interviewer
          {candidateCount > 0 && (
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {candidateCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}