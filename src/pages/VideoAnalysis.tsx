
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoUpload from "@/components/VideoUpload";
import ColorAnalysisResults from "@/components/ColorAnalysisResults";
import { toast } from "@/components/ui/use-toast";
import { analyzeVideoColors } from "@/utils/colorAnalysis";
import { ColorData } from "@/types/colorAnalysis";

const VideoAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [colorData, setColorData] = useState<ColorData | null>(null);

  const handleVideoUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      toast({
        title: "Processing video",
        description: "Analyzing color patterns in your video...",
      });
      
      // Process the video and analyze colors
      const results = await analyzeVideoColors(file);
      setColorData(results);
      
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
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoUpload onUpload={handleVideoUpload} isUploading={isAnalyzing} />
          </CardContent>
        </Card>
        
        {colorData && (
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Color Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ColorAnalysisResults data={colorData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoAnalysis;
