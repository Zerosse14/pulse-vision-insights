import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Brain, Zap, Star } from "lucide-react";

// Mock data for trends
const trendData = [
  { date: "2024-01", engagement: 65, reach: 1200, sentiment: 0.7 },
  { date: "2024-02", engagement: 72, reach: 1450, sentiment: 0.8 },
  { date: "2024-03", engagement: 68, reach: 1320, sentiment: 0.6 },
  { date: "2024-04", engagement: 85, reach: 1680, sentiment: 0.9 },
  { date: "2024-05", engagement: 92, reach: 1890, sentiment: 0.85 },
  { date: "2024-06", engagement: 88, reach: 1750, sentiment: 0.78 }
];

const topicTrends = [
  { topic: "AI Technology", score: 95, change: "+12%" },
  { topic: "Sustainable Living", score: 87, change: "+8%" },
  { topic: "Remote Work", score: 82, change: "-3%" },
  { topic: "Digital Marketing", score: 79, change: "+15%" },
  { topic: "Health & Wellness", score: 76, change: "+5%" }
];

const mlModels = [
  { name: "BERT Sentiment", type: "sentiment", accuracy: "94%" },
  { name: "GPT-4 Trends", type: "prediction", accuracy: "89%" },
  { name: "CNN Topic Classifier", type: "classification", accuracy: "91%" }
];

const TrendAnalysisDashboard = () => {
  const [selectedModel, setSelectedModel] = useState("bert");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Trend Analysis Dashboard</span>
      </h1>

      {/* ML Model Selection */}
      <Card className="bg-black/20 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Machine Learning Models
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-4">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select ML Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bert">BERT Sentiment Analysis</SelectItem>
                <SelectItem value="gpt4">GPT-4 Trend Prediction</SelectItem>
                <SelectItem value="cnn">CNN Topic Classification</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mlModels.map((model, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <h4 className="font-medium">{model.name}</h4>
                </div>
                <p className="text-sm text-gray-400 mb-2">{model.type}</p>
                <Badge variant="secondary">{model.accuracy} accuracy</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-black/20 border-white/10 mb-6">
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicTrends.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{topic.score}</span>
                  <Badge variant={topic.change.startsWith('+') ? 'default' : 'destructive'}>
                    {topic.change.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {topic.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" strokeWidth={2} />
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
              <BarChart data={topicTrends.slice(0, 4)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="topic" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrendAnalysisDashboard;