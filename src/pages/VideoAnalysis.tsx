
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoUpload from "@/components/VideoUpload";
import ColorAnalysisResults from "@/components/ColorAnalysisResults";
import TranscriptResults from "@/components/TranscriptResults";
import { toast } from "@/components/ui/use-toast";
import { analyzeVideoColors } from "@/utils/colorAnalysis";
import { extractTranscript } from "@/utils/transcriptExtraction";
import { ColorData } from "@/types/colorAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VideoAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [colorData, setColorData] = useState<ColorData | null>(null);
  const [transcriptData, setTranscriptData] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("colors");

  const handleVideoUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setShowResults(false); // Reset results view while processing
      
      toast({
        title: "Processing video",
        description: "Analyzing color patterns and extracting transcript...",
      });
      
      // Process the video for color analysis
      const colorResults = await analyzeVideoColors(file);
      setColorData(colorResults);
      
      // Extract transcript from the video
      const transcript = await extractTranscript(file);
      setTranscriptData(transcript);
      
      setShowResults(true); // Show results once analysis is complete
      
      toast({
        title: "Analysis complete",
        description: "Your video has been analyzed successfully!",
      });
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error processing your video.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        <span className="gradient-text">Video Color Analysis</span>
      </h1>
      
      <div className="grid gap-6 md:grid-cols-1">
        {!showResults ? (
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Upload Video</CardTitle>
            </CardHeader>
            <CardContent>
              <VideoUpload onUpload={handleVideoUpload} isUploading={isAnalyzing} />
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Analysis Results</h2>
              <button 
                onClick={() => setShowResults(false)} 
                className="px-4 py-2 bg-black/30 hover:bg-black/50 rounded-md text-white transition-colors"
              >
                Analyze Another Video
              </button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="colors">Color Analysis</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors">
                <Card className="bg-black/20 border-white/10">
                  <CardHeader>
                    <CardTitle>Color Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {colorData && <ColorAnalysisResults data={colorData} />}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transcript">
                <Card className="bg-black/20 border-white/10">
                  <CardHeader>
                    <CardTitle>Transcript Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {transcriptData && <TranscriptResults transcript={transcriptData} />}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoAnalysis;
