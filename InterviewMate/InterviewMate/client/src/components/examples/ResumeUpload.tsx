import ResumeUpload from "../ResumeUpload";

export default function ResumeUploadExample() {
  const handleDataExtracted = (data: any) => {
    console.log("Data extracted:", data);
  };

  const handleUploadComplete = () => {
    console.log("Upload complete - ready to start interview");
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <ResumeUpload 
        onDataExtracted={handleDataExtracted}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}