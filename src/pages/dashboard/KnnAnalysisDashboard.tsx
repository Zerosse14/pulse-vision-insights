import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Brain, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KnnResult {
  nearestNeighbors: Array<{
    id: string;
    title: string;
    distance: number;
    similarity: number;
    features: {
      dominantColors: string[];
      genre: string;
      engagement: number;
    };
  }>;
  classification: {
    predictedCategory: string;
    confidence: number;
    reasoning: string;
  };
  insights: {
    patterns: string[];
    recommendations: string[];
  };
  visualization: {
    clusters: Array<{
      name: string;
      count: number;
      centerColor: string;
    }>;
  };
}

const KnnAnalysisDashboard = () => {
  const [k, setK] = useState("5");
  const [analysisType, setAnalysisType] = useState("content-similarity");
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<KnnResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!videoUrl) {
      toast({
        title: "Input Required",
        description: "Please provide a video URL or upload a video",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Simulate extracting features from video
      const videoFeatures = {
        dominantColors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
        genre: "educational",
        duration: 180,
        engagement: 8500,
        keywords: ["tutorial", "design", "creative"],
      };

      const { data, error } = await supabase.functions.invoke('knn-analysis', {
        body: { 
          videoFeatures,
          k: parseInt(k),
          analysisType 
        }
      });

      if (error) throw error;

      setResults(data);
      toast({
        title: "Analysis Complete",
        description: `Found ${data.nearestNeighbors.length} similar videos`,
      });
    } catch (error: any) {
      console.error("KNN analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to perform KNN analysis",
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
          <span className="gradient-text">KNN Video Analysis</span>
        </h1>
        <p className="text-muted-foreground">
          Find similar videos and classify content using K-Nearest Neighbors algorithm
        </p>
      </div>

      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Configure Analysis
          </CardTitle>
          <CardDescription>
            Set parameters for KNN analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL or Upload</Label>
            <Input
              id="videoUrl"
              placeholder="Enter video URL..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="bg-black/30 border-white/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="k-value">K Value (Number of Neighbors)</Label>
              <Input
                id="k-value"
                type="number"
                min="1"
                max="20"
                value={k}
                onChange={(e) => setK(e.target.value)}
                className="bg-black/30 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysis-type">Analysis Type</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger className="bg-black/30 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-similarity">Content Similarity</SelectItem>
                  <SelectItem value="genre-classification">Genre Classification</SelectItem>
                  <SelectItem value="engagement-prediction">Engagement Prediction</SelectItem>
                  <SelectItem value="color-clustering">Color Clustering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Run KNN Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Classification Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Category</p>
                  <p className="text-2xl font-bold">{results.classification.predictedCategory}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {results.classification.confidence}% Confidence
                </Badge>
              </div>
              <p className="text-muted-foreground">{results.classification.reasoning}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Nearest Neighbors ({results.nearestNeighbors.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.nearestNeighbors.map((neighbor, index) => (
                <div key={neighbor.id} className="p-4 rounded-lg bg-black/30 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">#{index + 1} - {neighbor.title}</p>
                      <p className="text-sm text-muted-foreground">{neighbor.features.genre}</p>
                    </div>
                    <Badge variant="outline">{neighbor.similarity}% Similar</Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {neighbor.features.dominantColors.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Distance: {neighbor.distance.toFixed(3)} | Engagement: {neighbor.features.engagement.toLocaleString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Detected Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.insights.patterns.map((pattern, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">{pattern}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.insights.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle>Content Clusters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.visualization.clusters.map((cluster, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-black/30 border border-white/10">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: cluster.centerColor }}
                    />
                    <p className="font-semibold">{cluster.name}</p>
                    <p className="text-sm text-muted-foreground">{cluster.count} videos</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default KnnAnalysisDashboard;
