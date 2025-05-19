
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Volume2, ChartLine } from "lucide-react";

interface TranscriptResultsProps {
  transcript: string;
}

const TranscriptResults: React.FC<TranscriptResultsProps> = ({ transcript }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  
  // Split text into paragraphs for better readability
  const paragraphs = transcript.split(/(?:\.\s+|\?\s+|\!\s+)/g).filter(p => p.trim().length > 0);
  
  // Basic text statistics
  const wordCount = transcript.split(/\s+/).filter(Boolean).length;
  const charCount = transcript.replace(/\s+/g, '').length;
  const sentenceCount = transcript.split(/[.!?]+/).filter(Boolean).length;
  const avgWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
  
  // Find most common words (exclude common stop words)
  const stopWords = ['the', 'and', 'a', 'to', 'in', 'of', 'is', 'that', 'it', 'for', 'with', 'as', 'was', 'on'];
  const wordFrequency: Record<string, number> = {};
  
  transcript.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  
  const topWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Handle text-to-speech playback
  const handlePlayback = () => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(transcript);
    window.speechSynthesis.speak(utterance);
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentSpeech(null);
    };
    
    setIsPlaying(true);
    setCurrentSpeech(utterance);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="transcript">
        <TabsList>
          <TabsTrigger value="transcript">
            <FileText className="h-4 w-4 mr-2" />
            Transcript
          </TabsTrigger>
          <TabsTrigger value="insights">
            <ChartLine className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Video Transcript</h3>
            <Button onClick={handlePlayback} variant="outline" className="flex items-center">
              <Volume2 className="h-4 w-4 mr-2" />
              {isPlaying ? 'Stop Audio' : 'Play as Audio'}
            </Button>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-md max-h-[400px] overflow-y-auto">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, idx) => (
                <p key={idx} className="mb-3 last:mb-0">
                  {paragraph.trim()}.
                </p>
              ))
            ) : (
              <p>{transcript}</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-900/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Text Statistics</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Words:</span>
                  <span className="font-mono">{wordCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Characters:</span>
                  <span className="font-mono">{charCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Sentences:</span>
                  <span className="font-mono">{sentenceCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Avg. words per sentence:</span>
                  <span className="font-mono">{avgWordsPerSentence}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Common Words</h3>
              {topWords.length > 0 ? (
                <ul className="space-y-2">
                  {topWords.map(([word, count], idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>"{word}"</span>
                      <span className="font-mono">{count}x</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No significant words found.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TranscriptResults;
