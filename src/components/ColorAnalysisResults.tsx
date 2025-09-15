
import React from 'react';
import { ColorData } from '@/types/colorAnalysis';
import { generateColorInsights } from '@/utils/colorInsights';
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

  // Generate dynamic insights based on actual color data
  const insights = generateColorInsights(data);

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
              {/* Dynamic Recommendations */}
              <div className="space-y-4">
                <h4 className="font-medium text-green-400 mb-3">✅ What's Working Well</h4>
                {insights.workingWell.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {insights.workingWell.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                        <span>{insight.message}</span>
                        <span className="text-xs text-green-300 ml-auto">
                          {insight.confidence}% confidence
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Analyzing your color data...</p>
                )}
              </div>

              {/* Dynamic Improvements */}
              <div className="space-y-4">
                <h4 className="font-medium text-orange-400 mb-3">🔄 What You Can Improve</h4>
                {insights.improvements.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {insights.improvements.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <span>{insight.message}</span>
                        <span className="text-xs text-orange-300 ml-auto">
                          {insight.confidence}% confidence
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Your color palette looks well-balanced!</p>
                )}
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
                  {insights.specificActions.colorGrading.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                  {insights.specificActions.colorGrading.length === 0 && (
                    <li className="text-gray-400">• Current grading looks good</li>
                  )}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-blue-400">Visual Elements</h4>
                <ul className="space-y-1 text-sm">
                  {insights.specificActions.visualElements.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                  {insights.specificActions.visualElements.length === 0 && (
                    <li className="text-gray-400">• Visual elements well-balanced</li>
                  )}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-purple-400">Lighting Changes</h4>
                <ul className="space-y-1 text-sm">
                  {insights.specificActions.lightingChanges.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                  {insights.specificActions.lightingChanges.length === 0 && (
                    <li className="text-gray-400">• Lighting setup optimal</li>
                  )}
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
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium mb-2">AI-Powered Performance Prediction</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Overall Score:</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    insights.performanceMetrics.overallScore >= 80 ? 'bg-green-500/20 text-green-300' :
                    insights.performanceMetrics.overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {insights.performanceMetrics.overallScore}/100
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2 font-medium">Predicted Metrics:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Watch time: {insights.performanceMetrics.watchTime}</li>
                    <li>• Click-through rate: {insights.performanceMetrics.clickThrough}</li>
                    <li>• Emotional response: {insights.performanceMetrics.emotionalResponse}</li>
                    <li>• Brand recall: {insights.performanceMetrics.brandRecall}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm mb-2 font-medium">Based on color psychology analysis of:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• {data.distribution.length} distinct colors analyzed</li>
                    <li>• {data.dominant.color} dominance at {data.dominant.percentage.toFixed(1)}%</li>
                    <li>• Color harmony and engagement scores</li>
                    <li>• Psychological impact assessment</li>
                  </ul>
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
