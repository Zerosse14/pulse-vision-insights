
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, PaletteIcon } from 'lucide-react';

const VideoAnalysis = () => {
  const navigate = useNavigate();

  const handleGoToColorDashboard = () => {
    navigate('/dashboard/color');
  };
  
  const handleGoToTranscriptDashboard = () => {
    navigate('/dashboard/transcript');
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        <span className="gradient-text">Video Analysis</span>
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PaletteIcon className="h-5 w-5" />
              Color Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">
              Analyze the color patterns, palette, and visual mood of your videos 
              to optimize engagement and emotional impact.
            </p>
            
            <Button onClick={handleGoToColorDashboard} className="w-full">
              Try Color Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Transcript Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">
              Extract and analyze the spoken content of your videos to gain insights
              into messaging, keywords, and engagement potential.
            </p>
            
            <Button onClick={handleGoToTranscriptDashboard} className="w-full">
              Try Transcript Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoAnalysis;
