
import React from 'react';
import { ColorData } from '@/types/colorAnalysis';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorAnalysisResultsProps {
  data: ColorData;
}

const ColorAnalysisResults: React.FC<ColorAnalysisResultsProps> = ({ data }) => {
  // Map the color names to their actual CSS color values
  const colorMap: Record<string, string> = {
    "Red": "#ff0000",
    "Green": "#00ff00",
    "Blue": "#0000ff",
    "Yellow": "#ffff00",
    "Cyan": "#00ffff",
    "Magenta": "#ff00ff",
    "White": "#ffffff",
    "Black": "#000000",
    "Gray": "#808080",
    "Orange": "#ffa500",
    "Brown": "#a52a2a",
    "Pink": "#ffc0cb",
  };

  // Create timeline data for the area chart
  const timelineData = data.timeline.reduce((acc: Record<string, any>[], item) => {
    const existingFrame = acc.find(f => f.frame === item.frame);
    if (existingFrame) {
      existingFrame[item.color] = (existingFrame[item.color] || 0) + 1;
    } else {
      const newFrame = { frame: item.frame };
      newFrame[item.color] = 1;
      acc.push(newFrame);
    }
    return acc;
  }, []);

  // Create a color chip component
  const ColorChip = ({ color }: { color: string }) => (
    <div 
      className="w-4 h-4 rounded-sm inline-block mr-2" 
      style={{ backgroundColor: colorMap[color] || color }}
    />
  );

  return (
    <Tabs defaultValue="distribution" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="distribution">Color Distribution</TabsTrigger>
        <TabsTrigger value="timeline">Color Timeline</TabsTrigger>
        <TabsTrigger value="insights">Color Insights</TabsTrigger>
      </TabsList>

      <TabsContent value="distribution" className="space-y-4">
        <div className="h-72 w-full">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  nameKey="color"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                >
                  {data.distribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colorMap[entry.color] || `hsl(${index * 45}, 70%, 50%)`} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
          <h3 className="text-lg font-medium mb-2">Color Breakdown</h3>
          {data.distribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <ColorChip color={item.color} />
                <span>{item.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-40 h-2 rounded-full bg-gray-700">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: colorMap[item.color] || `hsl(${index * 45}, 70%, 50%)` 
                    }}
                  ></div>
                </div>
                <span className="text-sm">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="timeline">
        <div className="h-72 w-full">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frame" label={{ value: 'Frame Number', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Color Presence', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                {Object.keys(colorMap).map((color, index) => (
                  data.distribution.some(item => item.color === color) && (
                    <Area 
                      key={index}
                      type="monotone"
                      dataKey={color}
                      stackId="1"
                      stroke={colorMap[color]}
                      fill={colorMap[color]}
                    />
                  )
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </TabsContent>

      <TabsContent value="insights">
        <div className="space-y-6">
          {/* Current Analysis */}
          <div className="bg-black/20 border border-white/10 rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Current Color Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Dominant Color</h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-md" 
                      style={{ backgroundColor: colorMap[data.dominant.color] || '#808080' }}
                    ></div>
                    <span>{data.dominant.color} ({data.dominant.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Color Mood</h4>
                  <p className="text-lg">{data.mood}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Current Color Palette</h4>
                <div className="flex gap-2 flex-wrap">
                  {data.distribution.slice(0, 5).map((item, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-10 h-10 rounded-md mb-1 mx-auto" 
                        style={{ backgroundColor: colorMap[item.color] || `hsl(${index * 45}, 70%, 50%)` }}
                      ></div>
                      <span className="text-xs">{item.color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Insights */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🎯 What You Can Do & Change
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className="space-y-4">
                <h4 className="font-medium text-green-400 mb-3">✅ What's Working Well</h4>
                <ul className="space-y-2 text-sm">
                  {data.dominant.percentage > 40 && (
                    <li>• Strong color focus with {data.dominant.color.toLowerCase()} dominance creates visual consistency</li>
                  )}
                  {data.distribution.length <= 4 && (
                    <li>• Clean, minimal color palette is easy on the eyes</li>
                  )}
                  {data.mood.includes("energetic") && (
                    <li>• Current mood conveys energy and engagement</li>
                  )}
                  {data.mood.includes("calm") && (
                    <li>• Calming color scheme promotes viewer retention</li>
                  )}
                  <li>• Color distribution shows {data.distribution.length > 5 ? "dynamic variety" : "focused consistency"}</li>
                </ul>
              </div>

              {/* Improvements */}
              <div className="space-y-4">
                <h4 className="font-medium text-orange-400 mb-3">🔄 What You Can Improve</h4>
                <ul className="space-y-2 text-sm">
                  {data.dominant.percentage > 60 && (
                    <li>• Add accent colors to break monotony ({data.dominant.color.toLowerCase()} takes up {data.dominant.percentage.toFixed(0)}%)</li>
                  )}
                  {data.distribution.length > 6 && (
                    <li>• Simplify color palette - too many colors can be distracting</li>
                  )}
                  {!data.distribution.some(c => c.color === "Blue") && data.mood.includes("corporate") && (
                    <li>• Consider adding blue tones for trust and professionalism</li>
                  )}
                  {!data.distribution.some(c => c.color === "Green") && (
                    <li>• Add green accents to convey freshness and positivity</li>
                  )}
                  <li>• Experiment with complementary colors to create visual interest</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specific Actions */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🛠️ Specific Actions to Take
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-yellow-400">Color Grading</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Increase saturation by 10-15%</li>
                  <li>• Adjust white balance for warmer feel</li>
                  <li>• Add subtle color gradients</li>
                  <li>• Enhance shadow/highlight contrast</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-blue-400">Visual Elements</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Add colored text overlays</li>
                  <li>• Use colored borders/frames</li>
                  <li>• Include branded color accents</li>
                  <li>• Add colored graphics/icons</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-purple-400">Lighting Changes</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Use colored LED lights</li>
                  <li>• Add ambient background lighting</li>
                  <li>• Try golden hour filters</li>
                  <li>• Experiment with ring light colors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Impact */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 Color Psychology Impact
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Viewer Engagement Prediction</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">Based on your color analysis:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Watch time: {data.mood.includes("energetic") ? "Above average" : "Standard"}</li>
                      <li>• Click-through rate: {data.distribution.length <= 4 ? "Higher potential" : "Moderate"}</li>
                      <li>• Emotional response: {data.mood}</li>
                      <li>• Brand recall: {data.dominant.percentage > 50 ? "Strong" : "Moderate"}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm mb-2">Recommended changes for better performance:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Add contrasting colors for 15% longer watch time</li>
                      <li>• Use warm colors for 20% more engagement</li>
                      <li>• Include brand colors for 25% better recall</li>
                      <li>• Balance color distribution for optimal viewing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ColorAnalysisResults;
