
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TranscriptAnalysis = () => {
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
          <p className="text-gray-400">
            Extract valuable insights from your video transcripts using our cutting-edge LLM technology.
            Get content suggestions and topic analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptAnalysis;
