
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrendAnalysis = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        <span className="gradient-text">Trend Analysis</span>
      </h1>
      <Card className="bg-black/20 border-white/10">
        <CardHeader>
          <CardTitle>Real-time Content Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Stay ahead with AI-powered content trend analysis and predictions.
            Get insights into what's trending and optimize your content strategy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
