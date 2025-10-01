import { useState } from "react";
import TabNavigation from "../TabNavigation";

export default function TabNavigationExample() {
  const [activeTab, setActiveTab] = useState<"interviewee" | "interviewer">("interviewee");

  return (
    <TabNavigation 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      candidateCount={3}
    />
  );
}