import CandidateList from "../CandidateList";

// todo: remove mock functionality
const mockCandidates = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1-555-0123",
    score: 85,
    status: "completed" as const,
    questionsAnswered: 6,
    totalQuestions: 6,
    startedAt: new Date("2024-01-15T10:30:00"),
    completedAt: new Date("2024-01-15T11:15:00"),
    summary: "Strong full-stack developer with excellent React and Node.js knowledge. Good problem-solving skills and clear communication."
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1-555-0124",
    score: 92,
    status: "completed" as const,
    questionsAnswered: 6,
    totalQuestions: 6,
    startedAt: new Date("2024-01-14T14:20:00"),
    completedAt: new Date("2024-01-14T15:05:00"),
    summary: "Exceptional candidate with deep understanding of modern web development. Outstanding performance on advanced questions."
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1-555-0125",
    status: "in-progress" as const,
    questionsAnswered: 3,
    totalQuestions: 6,
    startedAt: new Date("2024-01-16T09:15:00"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-0126",
    score: 67,
    status: "completed" as const,
    questionsAnswered: 6,
    totalQuestions: 6,
    startedAt: new Date("2024-01-13T16:45:00"),
    completedAt: new Date("2024-01-13T17:30:00"),
    summary: "Solid fundamentals but needs improvement in advanced concepts. Shows good potential with proper mentoring."
  }
];

export default function CandidateListExample() {
  const handleCandidateSelect = (candidate: any) => {
    console.log("Selected candidate:", candidate);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <CandidateList 
        candidates={mockCandidates}
        onCandidateSelect={handleCandidateSelect}
      />
    </div>
  );
}