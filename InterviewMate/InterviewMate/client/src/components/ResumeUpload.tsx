import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtractedData {
  name?: string;
  email?: string;
  phone?: string;
}

interface ResumeUploadProps {
  onDataExtracted: (data: ExtractedData) => void;
  onUploadComplete: () => void;
}

export default function ResumeUpload({ onDataExtracted, onUploadComplete }: ResumeUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "completed">("idle");
  const [extractedData, setExtractedData] = useState<ExtractedData>({});
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setUploadStatus("uploading");
    
    // Simulate file upload and processing
    setTimeout(() => {
      setUploadStatus("processing");
      
      // Simulate AI extraction with some missing data
      setTimeout(() => {
        const extracted = {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "", // Missing phone number
        };
        
        const missing = Object.entries(extracted)
          .filter(([key, value]) => !value)
          .map(([key]) => key);
        
        setExtractedData(extracted);
        setMissingFields(missing);
        setUploadStatus("completed");
        onDataExtracted(extracted);
        
        if (missing.length === 0) {
          onUploadComplete();
        }
      }, 2000);
    }, 1000);
  };

  const handleFieldUpdate = (field: string, value: string) => {
    const updated = { ...extractedData, [field]: value };
    setExtractedData(updated);
    onDataExtracted(updated);
    
    const stillMissing = Object.entries(updated)
      .filter(([key, value]) => !value)
      .map(([key]) => key);
    setMissingFields(stillMissing);
    
    if (stillMissing.length === 0) {
      onUploadComplete();
    }
  };

  if (uploadStatus === "idle") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Resume
          </CardTitle>
          <CardDescription>
            Upload your resume to get started with the interview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover-elevate cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="input-resume-upload"
            />
            <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drop your PDF resume here or click to browse
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (uploadStatus === "uploading" || uploadStatus === "processing") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">
            {uploadStatus === "uploading" ? "Uploading resume..." : "Extracting information..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-chart-2" />
          Resume Processed
        </CardTitle>
        <CardDescription>
          {missingFields.length > 0 
            ? "Please fill in the missing information below"
            : "All information extracted successfully"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={extractedData.name || ""}
              onChange={(e) => handleFieldUpdate("name", e.target.value)}
              className={!extractedData.name ? "border-destructive" : ""}
              data-testid="input-name"
            />
            {!extractedData.name && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                This field is required
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={extractedData.email || ""}
              onChange={(e) => handleFieldUpdate("email", e.target.value)}
              className={!extractedData.email ? "border-destructive" : ""}
              data-testid="input-email"
            />
            {!extractedData.email && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                This field is required
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={extractedData.phone || ""}
              onChange={(e) => handleFieldUpdate("phone", e.target.value)}
              className={!extractedData.phone ? "border-destructive" : ""}
              data-testid="input-phone"
            />
            {!extractedData.phone && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                This field is required
              </p>
            )}
          </div>
        </div>
        
        {missingFields.length === 0 && (
          <Button 
            className="w-full" 
            onClick={onUploadComplete}
            data-testid="button-start-interview"
          >
            Start Interview
          </Button>
        )}
      </CardContent>
    </Card>
  );
}