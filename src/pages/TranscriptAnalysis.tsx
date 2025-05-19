
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const TranscriptAnalysis = () => {
  const navigate = useNavigate();

  const handleGoToVideoAnalysis = () => {
    navigate('/video-analysis');
  };
  
  const handleGoToDashboard = () => {
    navigate('/dashboard/transcript');
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        <span className="gradient-text">Transcript Analysis</span>
      </h1>
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle>Smart Transcript Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-6">
            Extract valuable insights from your video transcripts using our cutting-edge technology.
            Get content suggestions, topic analysis, and more from your video audio.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button onClick={handleGoToVideoAnalysis} variant="outline" size="lg">
              Go to Video Analysis
            </Button>
            <Button onClick={handleGoToDashboard} size="lg">
              Try in Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptAnalysis;
