
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoUpload from "@/components/VideoUpload";
import { toast } from "@/components/ui/use-toast";
import { analyzeVideoColors, colorAnalysisModels } from "@/utils/colorAnalysis";
import { ColorData } from "@/types/colorAnalysis";
import ColorAnalysisResults from "@/components/ColorAnalysisResults";
import GenreRecommendations from "@/components/GenreRecommendations";
import { videoGenres, getGenreRecommendation, GenreRecommendation } from "@/utils/genreRecommendations";
import { Brain, Video, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ColorAnalysisDashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [colorData, setColorData] = useState<ColorData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedModel, setSelectedModel] = useState("basic");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [genreRecommendation, setGenreRecommendation] = useState<GenreRecommendation | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const handleGenreChange = async (value: string) => {
    setSelectedGenre(value);
    setIsLoadingRecommendations(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-genre-recommendations', {
        body: { genre: value }
      });

      if (error) throw error;
      
      setGenreRecommendation(data);
      toast({
        title: "Recommendations Generated",
        description: `AI-powered recommendations for ${value} videos loaded successfully.`,
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Using default data.",
        variant: "destructive",
      });
      // Fallback to static recommendations
      setGenreRecommendation(getGenreRecommendation(value));
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setShowResults(false);
      
      toast({
        title: "Processing video",
        description: "Analyzing color patterns in your video...",
      });
      
      // Process the video for color analysis with selected model
      const colorResults = await analyzeVideoColors(file, selectedModel);
      setColorData(colorResults);
      
      setShowResults(true);
      
      toast({
        title: "Analysis complete",
        description: "Your video colors have been analyzed successfully!",
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
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Color Analysis Dashboard</span>
      </h1>
      
      {!showResults ? (
        <>
          {/* Genre Selection */}
          <Card className="bg-black/20 border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Select Video Genre
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <Select value={selectedGenre} onValueChange={handleGenreChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Video Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(videoGenres).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-400">
                  {selectedGenre ? `Selected: ${videoGenres[selectedGenre as keyof typeof videoGenres]}` : "Choose a genre for personalized AI recommendations"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Genre Recommendations */}
          {selectedGenre && (
            <div className="mb-6">
              <GenreRecommendations 
                recommendation={genreRecommendation} 
                selectedGenre={videoGenres[selectedGenre as keyof typeof videoGenres]}
                isLoading={isLoadingRecommendations}
              />
            </div>
          )}

          {/* ML Model Selection */}
          <Card className="bg-black/20 border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Analysis Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(colorAnalysisModels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-400">
                  Selected: {colorAnalysisModels[selectedModel as keyof typeof colorAnalysisModels]}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Upload Video for Color Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VideoUpload onUpload={handleVideoUpload} isUploading={isAnalyzing} />
              {!selectedGenre && (
                <p className="text-sm text-yellow-400 mt-2">
                  💡 Select a genre above to get personalized color recommendations before uploading!
                </p>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Color Analysis Results</h2>
            <Button 
              onClick={() => setShowResults(false)} 
              variant="outline"
            >
              Analyze Another Video
            </Button>
          </div>
          
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Color Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {colorData && <ColorAnalysisResults data={colorData} />}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ColorAnalysisDashboard;
