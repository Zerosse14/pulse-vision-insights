import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenreRecommendation } from "@/utils/genreRecommendations";
import { Palette, TrendingUp, Hash, Lightbulb, Target, Heart } from "lucide-react";

interface GenreRecommendationsProps {
  recommendation: GenreRecommendation;
  selectedGenre: string;
}

const GenreRecommendations: React.FC<GenreRecommendationsProps> = ({ 
  recommendation, 
  selectedGenre 
}) => {
  return (
    <Card className="bg-black/20 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          AI Recommendations for {selectedGenre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="optimization">Tips</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Recommended Colors
                </h4>
                <div className="space-y-2">
                  {recommendation.colorPalette.map((color, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-black/10">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{color.name}</div>
                        <div className="text-xs text-gray-400">{color.usage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 text-green-400">Colors to Use</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {recommendation.recommendedColors.map((color, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="text-sm font-semibold mb-2 text-red-400">Colors to Avoid</h4>
                <div className="flex flex-wrap gap-1">
                  {recommendation.avoidColors.map((color, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Words
                </h4>
                <div className="flex flex-wrap gap-1">
                  {recommendation.trendingWords.map((word, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Hashtag Suggestions
                </h4>
                <div className="flex flex-wrap gap-1">
                  {recommendation.hashtagSuggestions.map((hashtag, index) => (
                    <Badge key={index} className="text-xs bg-blue-500/20 text-blue-300">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Optimization Tips</h4>
              <ul className="space-y-2">
                {recommendation.optimizationTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="audience" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Target Audience
                </h4>
                <p className="text-sm text-gray-300">{recommendation.targetAudience}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Mood & Vibe
                </h4>
                <p className="text-sm text-gray-300">{recommendation.mood}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GenreRecommendations;