import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TrendData {
  date: string;
  engagement: number;
  reach: number;
}

interface TrendingTopic {
  topic: string;
  score: number;
  change: "up" | "down";
}

interface AnalysisResults {
  engagementTrends: TrendData[];
  trendingTopics: TrendingTopic[];
  insights: {
    summary: string;
    recommendations: string[];
  };
}

const TrendAnalysisDashboard = () => {
  const [selectedGenre, setSelectedGenre] = useState("technology");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-trends', {
        body: { genre: selectedGenre, timeframe: "past 7 days" }
      });

      if (error) throw error;

      setResults(data);
      toast({
        title: "Analysis Complete",
        description: "Trend analysis has been generated successfully",
      });
    } catch (error: any) {
      console.error("Trend analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze trends",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">Trend Analysis Dashboard</span>
        </h1>
        <p className="text-muted-foreground">
          AI-powered trend analysis for your content genre
        </p>
      </div>

      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle>Configure Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-black/30 border-white/20">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Trends...
              </>
            ) : (
              "Run Trend Analysis"
            )}
          </Button>

          {results?.insights && (
            <div className="pt-4 space-y-2">
              <p className="text-sm font-medium">AI Insights</p>
              <p className="text-sm text-muted-foreground">{results.insights.summary}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <>
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-white/10">
                    <span className="font-medium">{topic.topic}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">{topic.score}</span>
                      <Badge variant={topic.change === "up" ? "default" : "destructive"}>
                        {topic.change === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {topic.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.engagementTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)' 
                      }} 
                    />
                    <Line type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="reach" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.trendingTopics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="topic" stroke="rgba(255,255,255,0.6)" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)' 
                      }} 
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {results.insights.recommendations.length > 0 && (
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.insights.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TrendAnalysisDashboard;
