
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColorAnalysisDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text">Color Analysis Dashboard</span>
      </h1>
      
      <Card className="bg-black/20 border-white/10 mb-6">
        <CardHeader>
          <CardTitle>Upload Video for Color Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-12">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-400 mb-4 text-center">
              Drag and drop your video file here, or click to browse
            </p>
            <Button>Upload Video</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Color Palette Extraction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Our AI analyzes your video frame by frame to extract dominant colors
              and create a coherent color palette that represents your content.
            </p>
            <div className="flex gap-2 justify-center">
              <div className="w-12 h-12 rounded-md bg-blue-500"></div>
              <div className="w-12 h-12 rounded-md bg-purple-500"></div>
              <div className="w-12 h-12 rounded-md bg-pink-500"></div>
              <div className="w-12 h-12 rounded-md bg-indigo-500"></div>
              <div className="w-12 h-12 rounded-md bg-violet-500"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Color Mood Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Based on color psychology, we determine the emotional impact
              and mood conveyed by your video's color scheme.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Energetic</span>
                <div className="w-48 h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-orange-500 w-[75%]"></div>
                </div>
                <span>75%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Calming</span>
                <div className="w-48 h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-blue-500 w-[30%]"></div>
                </div>
                <span>30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Professional</span>
                <div className="w-48 h-2 rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-gray-500 w-[60%]"></div>
                </div>
                <span>60%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorAnalysisDashboard;
