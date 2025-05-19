
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import VideoUpload from "@/components/VideoUpload";
import { toast } from "@/components/ui/use-toast";
import { extractTranscript } from "@/utils/transcriptExtraction";
import TranscriptResults from "@/components/TranscriptResults";

const TranscriptAnalysisDashboard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptData, setTranscriptData] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleVideoUpload = async (file: File) => {
    try {
      setIsProcessing(true);
      setShowResults(false);
      
      toast({
        title: "Processing video",
        description: "Extracting transcript from your video...",
      });
      
      // Extract transcript from the video
      const transcript = await extractTranscript(file);
      setTranscriptData(transcript);
      
      setShowResults(true);
      
      toast({
        title: "Analysis complete",
        description: "Your video transcript has been extracted!",
      });
    } catch (error) {
      console.error("Error extracting transcript:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error processing your video.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Transcript Analysis Dashboard</span>
      </h1>
      
      {!showResults ? (
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Upload Video for Transcript Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoUpload onUpload={handleVideoUpload} isUploading={isProcessing} />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Transcript Results</h2>
            <Button 
              onClick={() => setShowResults(false)} 
              variant="outline"
            >
              Analyze Another Video
            </Button>
          </div>
          
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Extracted Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transcriptData && <TranscriptResults transcript={transcriptData} />}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TranscriptAnalysisDashboard;
